import './viewrecipe.css';
import AnimatePage from '../../components/AnimatePage';
import { useState, useEffect, useContext, useCallback } from 'react';
import Rating from '@mui/material/Rating';
import { useParams, Link } from 'react-router-dom';
import { SearchContext, UserContext } from '../../App';
import { API, cuisineLabel, dietLabel } from '../../recipeOptions';
import defaultAvatar from '../../images/defaultavatar.png';
import noImage from '../../images/noimageavailable.png';

const mediaUrl = (path) => (path && path.startsWith('http') ? path : API + path);

// "01:30:00" -> "1 hr 30 min"
const formatDuration = (t) => {
    if (!t) return '—';
    const [h = 0, m = 0] = t.split(':').map(Number);
    if (h === 0 && m === 0) return 'None';
    return [h ? h + ' hr' : '', m ? m + ' min' : ''].filter(Boolean).join(' ');
};

const totalMinutes = (...times) =>
    times.reduce((sum, t) => {
        if (!t) return sum;
        const [h = 0, m = 0] = t.split(':').map(Number);
        return sum + h * 60 + m;
    }, 0);

const formatMinutes = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (!h && !m) return 'None';
    return [h ? h + ' hr' : '', m ? m + ' min' : ''].filter(Boolean).join(' ');
};

function ViewRecipe() {
    const { recipeID } = useParams();
    const { setError, setSuccess } = useContext(UserContext);
    const { setSuggestions, setPageNum } = useContext(SearchContext);

    const [status, setStatus] = useState('loading'); // loading | ready | notfound | error
    const [recipe, setRecipe] = useState(null);
    const [instructions, setInstructions] = useState({});
    const [ingredients, setIngredients] = useState({});
    const [comments, setComments] = useState({});
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [posting, setPosting] = useState(false);
    // Likes / favourites / ratings, plus the viewer's own choices
    const [community, setCommunity] = useState(null);
    const [communityBusy, setCommunityBusy] = useState(false);

    const loggedIn = Boolean(localStorage.getItem('access'));

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);

    const loadRecipe = useCallback(() => {
        return fetch(API + "/recipes/" + recipeID + "/")
            .then((response) => {
                if (response.status === 404) {
                    setStatus('notfound');
                    return null;
                }
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                setRecipe(data.recipe_details);
                setInstructions(data.instructions || {});
                setIngredients(data.ingredients || {});
                setImages(Object.values(data.images || {}));
                setComments(data.comments || {});
                const r = data.recipe_details;
                setCommunity((prev) => ({
                    liked: false, is_favourite: false, my_rating: null,
                    can_rate: r.owner !== localStorage.getItem('email'),
                    ...prev,
                    likes: r.likes, favourited: r.favourited,
                    star_rating: Number(r.star_rating) || 0, rating_count: r.rating_count || 0,
                }));
                setStatus('ready');
            })
            .catch(() => setStatus('error'));
    }, [recipeID]);

    useEffect(() => {
        setStatus('loading');
        setActiveImage(0);
        setCommunity(null);
        loadRecipe();
    }, [loadRecipe]);

    const authHeaders = () => ({
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Content-Type': 'application/json',
    });

    // The viewer's own like / favourite / rating
    useEffect(() => {
        if (!loggedIn) return;
        fetch(API + "/recipes/" + recipeID + "/community/", { headers: authHeaders() })
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => data && setCommunity((prev) => ({ ...prev, ...data })))
            .catch(() => {});
    }, [recipeID, loggedIn]);

    // method POST adds / sets, DELETE removes; the response is the new community state
    const sendCommunity = (path, method, body, failMessage) => {
        setCommunityBusy(true);
        fetch(API + "/recipes/" + recipeID + "/" + path + "/", {
            method: method,
            headers: authHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => setCommunity((prev) => ({ ...prev, ...data })))
            .catch(() => setError(failMessage))
            .finally(() => setCommunityBusy(false));
    };

    const toggleLike = () =>
        sendCommunity('like', community.liked ? 'DELETE' : 'POST', null, "Your like could not be saved. Please try again.");
    const toggleFavourite = () =>
        sendCommunity('fav', community.is_favourite ? 'DELETE' : 'POST', null, "Your favourite could not be saved. Please try again.");
    const rate = (score) =>
        sendCommunity('rate', 'POST', { score: score }, "Your rating could not be saved. Please try again.");
    const clearRating = () =>
        sendCommunity('rate', 'DELETE', null, "Your rating could not be removed. Please try again.");

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setPosting(true);
        fetch(API + "/recipes/" + recipeID + "/addcomment/", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: newComment.trim() }),
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                setNewComment('');
                setSuccess("Your comment was posted!");
                return loadRecipe();
            })
            .catch(() => setError("Your comment could not be posted. Please try again."))
            .finally(() => setPosting(false));
    };

    if (status === 'loading') {
        return (
            <AnimatePage>
                <div className="container" id="view-recipe-page">
                    <p className="vr-status">Loading recipe…</p>
                </div>
            </AnimatePage>
        );
    }

    if (status !== 'ready') {
        return (
            <AnimatePage>
                <div className="container" id="view-recipe-page">
                    <div className="vr-card vr-status-card">
                        <h1 className="vr-card-title">
                            {status === 'notfound' ? "We couldn't find that recipe" : "Something went wrong"}
                        </h1>
                        <p>
                            {status === 'notfound'
                                ? "It may have been removed, or the link is wrong."
                                : "The recipe could not be loaded. Please try again in a moment."}
                        </p>
                        <Link to="/" className="vr-btn vr-btn-primary">Back to home</Link>
                    </div>
                </div>
            </AnimatePage>
        );
    }

    const steps = Object.entries(instructions).sort(([a], [b]) => Number(a) - Number(b));
    const ingredientList = Object.entries(ingredients);
    const commentList = Object.entries(comments);
    const diets = Array.isArray(recipe.diets) ? recipe.diets : (recipe.diets ? [recipe.diets] : []);
    const cuisine = cuisineLabel(recipe.cuisine);
    const c = community || { likes: recipe.likes, favourited: recipe.favourited, star_rating: Number(recipe.star_rating) || 0,
        rating_count: recipe.rating_count || 0, liked: false, is_favourite: false, my_rating: null, can_rate: false };
    const rating = c.rating_count ? c.star_rating : 0;
    const mainImage = images.length ? mediaUrl(images[Math.min(activeImage, images.length - 1)]) : noImage;

    return (
        <AnimatePage>
            <div className="container" id="view-recipe-page">
                <header className="vr-header">
                    <h1 className="vr-title">{recipe.name}</h1>
                    <p className="vr-byline">Shared by {recipe.owner_display_name || 'an EasyChef cook'}</p>
                    {(cuisine || diets.length > 0) && (
                        <ul className="vr-tags" aria-label="Recipe tags">
                            {cuisine && <li className="vr-tag">{cuisine}</li>}
                            {diets.map((d) => <li key={d} className="vr-tag vr-tag-diet">{dietLabel(d)}</li>)}
                        </ul>
                    )}
                </header>

                <div className="vr-layout">
                    <div className="vr-main">
                        <section className="vr-card vr-gallery" aria-label="Photos">
                            <img className="vr-main-image" src={mainImage}
                                alt={images.length ? recipe.name + " photo " + (activeImage + 1) : "No photo available"} />
                            {images.length > 1 && (
                                <div className="vr-thumbs">
                                    {images.map((img, index) => (
                                        <button key={img} type="button"
                                            className={"vr-thumb" + (index === activeImage ? " active" : "")}
                                            aria-label={"Show photo " + (index + 1)}
                                            aria-pressed={index === activeImage}
                                            onClick={() => setActiveImage(index)}>
                                            <img src={mediaUrl(img)} alt="" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="vr-card">
                            <h2 className="vr-card-title">Description</h2>
                            <p className="vr-prose">{recipe.description || "No description provided."}</p>
                        </section>

                        <section className="vr-card">
                            <h2 className="vr-card-title">Ingredients</h2>
                            <p className="vr-hint">For {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}</p>
                            {ingredientList.length ? (
                                <ul className="vr-ingredients">
                                    {ingredientList.map(([name, qty]) => (
                                        <li key={name}>
                                            <span className="vr-ingredient-name">{name}</span>
                                            <span className="vr-ingredient-qty">{qty}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="vr-empty">No ingredients listed.</p>}
                        </section>

                        <section className="vr-card">
                            <h2 className="vr-card-title">Instructions</h2>
                            {steps.length ? (
                                <ol className="vr-steps">
                                    {steps.map(([num, desc]) => (
                                        <li key={num}>
                                            <span className="vr-step-num" aria-hidden="true">{num}</span>
                                            <p>{desc}</p>
                                        </li>
                                    ))}
                                </ol>
                            ) : <p className="vr-empty">No instructions yet.</p>}
                        </section>

                    </div>

                    <aside className="vr-side">
                        {loggedIn && recipe.owner === localStorage.getItem('email') && (
                            <Link to={"/editrecipe/" + recipe.id} className="vr-btn vr-btn-primary">Edit recipe</Link>
                        )}
                        <section className="vr-card">
                            <h2 className="vr-card-title">At a glance</h2>
                            <dl className="vr-facts">
                                <div><dt>Prep time</dt><dd>{formatDuration(recipe.prep_time)}</dd></div>
                                <div><dt>Cook time</dt><dd>{formatDuration(recipe.cook_time)}</dd></div>
                                <div><dt>Total time</dt><dd>{formatMinutes(totalMinutes(recipe.prep_time, recipe.cook_time))}</dd></div>
                                <div><dt>Servings</dt><dd>{recipe.servings}</dd></div>
                                <div><dt>Cuisine</dt><dd>{cuisine || 'Not specified'}</dd></div>
                            </dl>
                        </section>

                        <section className="vr-card">
                            <h2 className="vr-card-title">Community</h2>
                            <div className="vr-rating">
                                <Rating value={rating} precision={0.1} readOnly
                                    aria-label={c.rating_count ? "Average rating " + rating.toFixed(1) + " out of 5" : "Not rated yet"} />
                                <span>
                                    {c.rating_count
                                        ? rating.toFixed(1) + " / 5 · " + c.rating_count + (c.rating_count === 1 ? " rating" : " ratings")
                                        : "Not rated yet"}
                                </span>
                            </div>

                            <div className="vr-community-actions">
                                <button type="button" className={"vr-toggle" + (c.liked ? " active" : "")}
                                    aria-pressed={c.liked} disabled={!loggedIn || communityBusy} onClick={toggleLike}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill={c.liked ? "currentColor" : "none"}
                                        stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                        <path d="M7 10v11H3V10h4zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7" />
                                    </svg>
                                    <span>{c.liked ? 'Liked' : 'Like'}</span>
                                    <span className="vr-toggle-count" aria-label={c.likes + " likes"}>{c.likes}</span>
                                </button>
                                <button type="button" className={"vr-toggle" + (c.is_favourite ? " active" : "")}
                                    aria-pressed={c.is_favourite} disabled={!loggedIn || communityBusy} onClick={toggleFavourite}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill={c.is_favourite ? "currentColor" : "none"}
                                        stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                        <path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 4.5 7 4.5c2.2 0 3.6 1.2 5 3 1.4-1.8 2.8-3 5-3 3.7 0 5.9 3.8 4.5 7.2C19.5 16.4 12 21 12 21z" />
                                    </svg>
                                    <span>{c.is_favourite ? 'Favourited' : 'Favourite'}</span>
                                    <span className="vr-toggle-count" aria-label={c.favourited + " favourites"}>{c.favourited}</span>
                                </button>
                            </div>

                            {!loggedIn ? (
                                <p className="vr-hint"><Link to="/login">Log in</Link> to like, favourite or rate this recipe.</p>
                            ) : !c.can_rate ? (
                                <p className="vr-hint">You can't rate your own recipe.</p>
                            ) : (
                                <div className="vr-my-rating">
                                    <p className="vr-field-label" id="vr-my-rating-label">Your rating</p>
                                    <div className="vr-my-rating-row">
                                        <button type="button" className={"vr-zero" + (c.my_rating === 0 ? " active" : "")}
                                            aria-pressed={c.my_rating === 0} disabled={communityBusy} onClick={() => rate(0)}>
                                            0
                                        </button>
                                        <Rating name="vr-my-rating" value={c.my_rating || null} max={5} size="large"
                                            aria-labelledby="vr-my-rating-label" disabled={communityBusy}
                                            onChange={(e, value) => { if (value !== null) rate(value); }} />
                                    </div>
                                    <p className="vr-hint" aria-live="polite">
                                        {c.my_rating === null || c.my_rating === undefined
                                            ? "Choose 0 to 5 stars."
                                            : "You gave this " + c.my_rating + (c.my_rating === 1 ? " star." : " stars.")}
                                        {c.my_rating !== null && c.my_rating !== undefined && (
                                            <button type="button" className="vr-link-btn" disabled={communityBusy}
                                                onClick={clearRating}>Remove my rating</button>
                                        )}
                                    </p>
                                </div>
                            )}
                        </section>
                    </aside>
                </div>

                <section className="vr-card vr-comments-card">
                    <h2 className="vr-card-title">
                        Comments {commentList.length > 0 && <span className="vr-count">({commentList.length})</span>}
                    </h2>
                    {loggedIn ? (
                        <form onSubmit={handleCommentSubmit} className="vr-comment-form">
                            <label htmlFor="vr-new-comment" className="vr-visually-hidden">Add a comment</label>
                            <textarea id="vr-new-comment" rows="3" className="vr-input"
                                placeholder="Share your thoughts or tips…"
                                value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <button type="submit" className="vr-btn vr-btn-primary"
                                disabled={posting || !newComment.trim()}>
                                {posting ? 'Posting…' : 'Post comment'}
                            </button>
                        </form>
                    ) : (
                        <p className="vr-hint"><Link to="/login">Log in</Link> to leave a comment.</p>
                    )}
                    {commentList.length ? (
                        <ul className="vr-comments">
                            {commentList.map(([id, comment]) => (
                                <li key={id} className="vr-comment">
                                    <img className="vr-avatar" alt=""
                                        src={comment.owner_avatar ? mediaUrl(comment.owner_avatar) : defaultAvatar} />
                                    <div className="vr-comment-body">
                                        <p className="vr-comment-name">{(comment.owner_name || '').trim() || comment.owner}</p>
                                        <p className="vr-prose">{comment.description}</p>
                                        {comment.images && Object.values(comment.images).length > 0 && (
                                            <div className="vr-comment-images">
                                                {Object.values(comment.images).map((img) => (
                                                    <img key={img} src={mediaUrl(img)} alt="Attached to comment" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="vr-empty">No comments yet. Be the first!</p>}
                </section>
            </div>
        </AnimatePage>
    );
}

export default ViewRecipe;
