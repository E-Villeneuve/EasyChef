import './createrecipe.css';
import React, { useState, useEffect, useContext } from 'react';
import AnimatePage from '../../components/AnimatePage';
import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { UserContext, SearchContext } from '../../App';
import { API, CUISINES, DIETS, UNITS } from '../../recipeOptions';


const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

let nextRowId = 0;
const emptyIngredient = () => ({ id: nextRowId++, name: '', quantity: '', unit: 'g' });
const emptyStep = (text = '') => ({ id: nextRowId++, text: text });

// The backend stores durations in a TimeField, so they must stay under 24 hours
const MAX_HOURS = 23;
const emptyDuration = () => ({ hours: '', minutes: '' });

const isDurationEmpty = (d) => d.hours === '' && d.minutes === '';

const isDurationValid = (d) => {
    const h = d.hours === '' ? 0 : Number(d.hours);
    const m = d.minutes === '' ? 0 : Number(d.minutes);
    return Number.isInteger(h) && Number.isInteger(m) && h >= 0 && h <= MAX_HOURS && m >= 0 && m <= 59;
};

// "HH:MM:SS" from the backend -> { hours, minutes }
const fromTimeString = (t) => {
    const [h = 0, m = 0] = (t || '').split(':').map(Number);
    return { hours: String(h), minutes: String(m) };
};

const MAX_QUANTITY = 99999.99; // RecipeIngredient.quantity is max_digits=7, decimal_places=2

const toMinutes = (d) => Number(d.hours || 0) * 60 + Number(d.minutes || 0);

// { hours, minutes } -> "HH:MM:00" for the backend
const toTimeString = (d) => {
    const pad = (n) => String(Number(n || 0)).padStart(2, '0');
    return pad(d.hours) + ':' + pad(d.minutes) + ':00';
};

// Cooking-time tag the search filters use, derived from prep + cook time
const cookingTimeTag = (prep, cook) => {
    const total = toMinutes(prep) + toMinutes(cook);
    if (total <= 60) return '1HR';
    if (total <= 120) return '2HRS';
    return '3HRS';
};

function DurationInput({ id, label, value, onChange }) {
    return (
        <fieldset className="cr-duration">
            <legend className="cr-field-label">{label}</legend>
            <div className="cr-duration-fields">
                <div className="cr-qty">
                    <label htmlFor={id + "-h"} className="cr-visually-hidden">{label} hours</label>
                    <input id={id + "-h"} type="number" min="0" max={MAX_HOURS} step="1" inputMode="numeric"
                        placeholder="0" className="cr-input"
                        value={value.hours} onChange={(e) => onChange({ ...value, hours: e.target.value })} />
                    <span className="cr-unit" aria-hidden="true">hr</span>
                </div>
                <div className="cr-qty">
                    <label htmlFor={id + "-m"} className="cr-visually-hidden">{label} minutes</label>
                    <input id={id + "-m"} type="number" min="0" max="59" step="1" inputMode="numeric"
                        placeholder="0" className="cr-input"
                        value={value.minutes} onChange={(e) => onChange({ ...value, minutes: e.target.value })} />
                    <span className="cr-unit" aria-hidden="true">min</span>
                </div>
            </div>
        </fieldset>
    );
}

// Shared by Create Recipe and Edit Recipe; pass recipeId to edit an existing recipe
export function RecipeForm({ recipeId }) {
    const editing = Boolean(recipeId);
    const location = useLocation();
    const navigate = useNavigate();
    const { setError, setSuccess } = useContext(UserContext);
    const { setSuggestions, setPageNum } = useContext(SearchContext);

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);

    const [recipename, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState([emptyStep(), emptyStep()]);
    const [ingredients, setIngredients] = useState([emptyIngredient(), emptyIngredient(), emptyIngredient()]);
    const [diets, setDiets] = useState([]);
    const [cuisine, setCuisine] = useState('');
    const [prep_time, setPrep] = useState(emptyDuration());
    const [cook_time, setCook] = useState(emptyDuration());
    const [servings, setServings] = useState(1);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    // Edit mode only
    const [loadStatus, setLoadStatus] = useState(editing ? 'loading' : 'ready'); // loading | ready | forbidden | error
    const [existingImages, setExistingImages] = useState([]); // [{ id, url }]
    const [removedImageIds, setRemovedImageIds] = useState([]);

    useEffect(() => {
        if (!editing) return;
        setLoadStatus('loading');
        fetch(API + "/recipes/" + recipeId + "/")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => {
                const r = data.recipe_details;
                if (r.owner !== localStorage.getItem('email')) {
                    setLoadStatus('forbidden');
                    return;
                }
                setRecipeName(r.name || '');
                setDescription(r.description || '');
                setDiets(Array.isArray(r.diets) ? r.diets : []);
                setCuisine(r.cuisine || '');
                setServings(r.servings);
                setPrep(fromTimeString(r.prep_time));
                setCook(fromTimeString(r.cook_time));
                const loadedSteps = (data.step_list || []).map((text) => emptyStep(text));
                setInstructions(loadedSteps.length ? loadedSteps : [emptyStep()]);
                const ings = (data.ingredient_list || []).map((i) => ({
                    id: nextRowId++, name: i.name, quantity: String(Number(i.quantity)), unit: i.unit || 'g',
                }));
                setIngredients(ings.length ? ings : [emptyIngredient()]);
                setExistingImages(Object.entries(data.images || {}).map(([id, url]) => ({ id, url })));
                setRemovedImageIds([]);
                setLoadStatus('ready');
            })
            .catch(() => setLoadStatus('error'));
    }, [editing, recipeId]);

    const keptImages = existingImages.filter((img) => !removedImageIds.includes(img.id));

    // Object URLs for thumbnails; revoked whenever the selection changes
    useEffect(() => {
        const urls = files.map((f) => URL.createObjectURL(f));
        setPreviews(urls);
        return () => urls.forEach((u) => URL.revokeObjectURL(u));
    }, [files]);

    const addFiles = (fileList) => {
        const incoming = [...fileList];
        const images = incoming.filter((f) => f.type.startsWith('image/') && f.size <= MAX_IMAGE_BYTES);
        if (images.length < incoming.length) {
            setError("Some files were skipped. Only images up to 10 MB are allowed.");
        }
        setFiles((prev) => [...prev, ...images]);
    };

    const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

    const updateIngredient = (id, field, value) =>
        setIngredients((prev) => prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));

    const removeIngredient = (id) => setIngredients((prev) => prev.filter((ing) => ing.id !== id));

    const updateStep = (id, text) =>
        setInstructions((prev) => prev.map((step) => (step.id === id ? { ...step, text: text } : step)));

    const removeStep = (id) => setInstructions((prev) => prev.filter((step) => step.id !== id));

    // direction: -1 moves the step up, +1 moves it down
    const moveStep = (index, direction) =>
        setInstructions((prev) => {
            const target = index + direction;
            if (target < 0 || target >= prev.length) return prev;
            const next = [...prev];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });

    const fetchIngredientOptions = (query) => {
        if (!query) return;
        fetch(API + "/searchingredient/?search=" + encodeURIComponent(query))
            .then((response) => response.json())
            .then((data) => setIngredientOptions(data.results || []))
            .catch(() => {});
    };

    const toggleDiet = (value) =>
        setDiets((prev) => (prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]));

    const authHeader = () => ({ 'Authorization': 'Bearer ' + String(localStorage.getItem('access')) });

    const sendJSON = (method, url, body) =>
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(body),
        }).then((response) => {
            if (!response.ok) throw new Error(url);
            return response.json();
        });

    const filledIngredients = () =>
        ingredients.filter((ing) => ing.name.trim() !== '');

    const steps = () =>
        instructions.map((step) => step.text.trim()).filter((text) => text !== '');

    const validate = () => {
        const errors = [];
        if (!recipename.trim()) errors.push("Recipe title is missing!");
        if (!description.trim()) errors.push("Recipe description is missing!");
        if (filledIngredients().length === 0) errors.push("Add at least one ingredient!");
        if (filledIngredients().some((ing) => ing.quantity === '' || Number(ing.quantity) < 0))
            errors.push("Every ingredient needs a quantity!");
        else if (filledIngredients().some((ing) => Number(ing.quantity) > MAX_QUANTITY))
            errors.push("Ingredient quantities can be at most " + MAX_QUANTITY + "!");
        if (steps().length === 0) errors.push("Add at least one instruction step!");
        if (isDurationEmpty(prep_time)) errors.push("Preparation time is missing!");
        else if (!isDurationValid(prep_time)) errors.push("Preparation time must be under 24 hours, with 0-59 minutes!");
        if (isDurationEmpty(cook_time)) errors.push("Cooking time is missing!");
        else if (!isDurationValid(cook_time)) errors.push("Cooking time must be under 24 hours, with 0-59 minutes!");
        if (!servings || servings < 1) errors.push("Servings must be at least 1!");
        return errors;
    };

    const submit = async (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length) {
            setError(errors.join('\n'));
            return;
        }

        setSubmitting(true);
        const body = {
            name: recipename.trim(),
            description: description.trim(),
            cuisine: cuisine,
            prep_time: toTimeString(prep_time),
            cook_time: toTimeString(cook_time),
            servings: Number(servings),
            diets: diets,
            cookingtimetag: cookingTimeTag(prep_time, cook_time),
            // Saved together with the recipe, so they succeed or fail as one
            ingredient_list: filledIngredients().map((ing) => ({ name: ing.name.trim(), quantity: Number(ing.quantity), unit: ing.unit })),
            step_list: steps(),
        };

        let savedId;
        try {
            const data = editing
                ? await sendJSON('PATCH', API + "/recipes/" + recipeId + "/edit/", body)
                : await sendJSON('POST', API + "/recipes/addrecipe/", body);
            savedId = data.recipe_details.id;
        } catch (e) {
            setError(editing
                ? "Your changes could not be saved. Please check your details and try again."
                : "The recipe could not be created. Please check your details and try again.");
            setSubmitting(false);
            return;
        }

        const requests = [
            ...files.map((file) => {
                const formdata = new FormData();
                formdata.append('image', file);
                return fetch(API + "/recipes/" + savedId + "/addimage/", {
                    method: 'POST',
                    headers: authHeader(),
                    body: formdata,
                }).then((response) => {
                    if (!response.ok) throw new Error('image');
                });
            }),
            ...removedImageIds.map((imageId) =>
                fetch(API + "/recipes/" + savedId + "/deleteimage/" + imageId + "/", {
                    method: 'DELETE',
                    headers: authHeader(),
                }).then((response) => {
                    if (!response.ok) throw new Error('delete image');
                })),
        ];

        const results = await Promise.allSettled(requests);
        setSubmitting(false);
        if (results.some((r) => r.status === 'rejected')) {
            setError((editing ? "Your changes were saved" : "Your recipe was created")
                + ", but some photo changes failed. You can try again by editing the recipe.");
        } else {
            setSuccess(editing ? "Your recipe has been updated!" : "Your recipe has been published!");
        }
        navigate('/viewrecipe/' + savedId);
    };

    if (!localStorage.getItem('access')) {
        return <Navigate to='/unauthorized' state={{ path: location.pathname }} />;
    }

    if (loadStatus !== 'ready') {
        return (
            <AnimatePage>
                <div className="container" id="create-recipe-page">
                    {loadStatus === 'loading' ? <p className="cr-subtitle">Loading recipe…</p> : (
                        <section className="cr-card cr-status-card">
                            <h1 className="cr-card-title">
                                {loadStatus === 'forbidden' ? "You can only edit your own recipes" : "This recipe could not be loaded"}
                            </h1>
                            <p className="cr-hint">
                                {loadStatus === 'forbidden'
                                    ? "This recipe belongs to someone else."
                                    : "It may have been deleted, or the server could not be reached."}
                            </p>
                            <Link to="/myrecipes" className="cr-btn cr-btn-primary">Back to My Recipes</Link>
                        </section>
                    )}
                </div>
            </AnimatePage>
        );
    }

    return (
        <AnimatePage>
            <form className="container" id="create-recipe-page" onSubmit={submit} noValidate>
                <h1 className="cr-title">{editing ? "Edit recipe" : "Share a recipe"}</h1>
                <p className="cr-subtitle">
                    {editing ? "Update anything below, then save your changes."
                        : "Add photos, ingredients and a description so others can cook it."}
                </p>

                <div className="cr-layout">
                    <div className="cr-main">
                        <section className="cr-card">
                            <label htmlFor="cr-name" className="cr-card-title">Recipe title</label>
                            <input id="cr-name" type="text" className="cr-input" maxLength={255}
                                placeholder="e.g. Grandma's Apple Pie"
                                value={recipename} onChange={(e) => setRecipeName(e.target.value)} />
                        </section>

                        <section className="cr-card">
                            <div>
                                <h2 className="cr-card-title">Photos</h2>
                                <p className="cr-hint">The first photo is your cover image. Images up to 10 MB each.</p>
                            </div>
                            <div
                                className={"cr-dropzone" + (dragging ? " dragging" : "")}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M12 16V4" /><path d="M7 9l5-5 5 5" />
                                    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                                </svg>
                                <span>Drag photos here, or</span>
                                <label htmlFor="cr-photos" className="cr-btn cr-btn-primary">Choose photos</label>
                                <input id="cr-photos" type="file" accept="image/*" multiple className="cr-visually-hidden"
                                    onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                            </div>
                            {(keptImages.length + previews.length) > 0 && (
                                <div className="cr-thumbs">
                                    {keptImages.map((img, index) => (
                                        <div className="cr-thumb" key={'saved-' + img.id}>
                                            <img src={API + img.url} alt={"Saved photo " + (index + 1)} />
                                            {index === 0 && <span className="cr-thumb-cover">Cover</span>}
                                            <button type="button" className="cr-thumb-remove" aria-label="Remove photo"
                                                onClick={() => setRemovedImageIds((prev) => [...prev, img.id])}>×</button>
                                        </div>
                                    ))}
                                    {previews.map((src, index) => (
                                        <div className="cr-thumb" key={src}>
                                            <img src={src} alt={files[index] ? files[index].name : ''} />
                                            {keptImages.length === 0 && index === 0 && <span className="cr-thumb-cover">Cover</span>}
                                            <button type="button" className="cr-thumb-remove"
                                                aria-label="Remove photo" onClick={() => removeFile(index)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="cr-card">
                            <div>
                                <h2 className="cr-card-title">Ingredients</h2>
                                <p className="cr-hint">Enter amounts per serving. They're multiplied by the number of servings when the recipe is shown.</p>
                            </div>
                            <datalist id="cr-ingredient-options">
                                {ingredientOptions.map((opt) => <option key={opt.id ?? opt.name} value={opt.name} />)}
                            </datalist>
                            <div className="cr-ingredients">
                                {ingredients.map((ing, index) => (
                                    <div className="cr-ingredient-row" key={ing.id}>
                                        <label htmlFor={"cr-q" + ing.id} className="cr-visually-hidden">Quantity per serving for ingredient {index + 1}</label>
                                        <div className="cr-qty">
                                            <input id={"cr-q" + ing.id} type="number" min="0" max={MAX_QUANTITY} step="any" inputMode="decimal"
                                                placeholder="Qty" title="Quantity per serving" className="cr-input"
                                                value={ing.quantity} onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)} />
                                        </div>
                                        <label htmlFor={"cr-u" + ing.id} className="cr-visually-hidden">Unit for ingredient {index + 1}</label>
                                        <select id={"cr-u" + ing.id} className="cr-input cr-unit-select"
                                            value={ing.unit} onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}>
                                            {UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                        <label htmlFor={"cr-n" + ing.id} className="cr-visually-hidden">Ingredient {index + 1}</label>
                                        <input id={"cr-n" + ing.id} type="text" list="cr-ingredient-options"
                                            placeholder="Ingredient" className="cr-input cr-ingredient-name"
                                            value={ing.name}
                                            onChange={(e) => { updateIngredient(ing.id, 'name', e.target.value); fetchIngredientOptions(e.target.value); }} />
                                        <button type="button" className="cr-icon-btn" aria-label={"Remove ingredient " + (index + 1)}
                                            onClick={() => removeIngredient(ing.id)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="cr-btn cr-btn-outline cr-add"
                                onClick={() => setIngredients((prev) => [...prev, emptyIngredient()])}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                                Add ingredient
                            </button>
                        </section>

                        <section className="cr-card">
                            <label htmlFor="cr-desc" className="cr-card-title">Description</label>
                            <p className="cr-hint">Tell people what makes this recipe special, and any tips.</p>
                            <textarea id="cr-desc" rows="5" className="cr-input" placeholder="Describe your recipe…"
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </section>

                        <section className="cr-card">
                            <h2 className="cr-card-title">Instructions</h2>
                            <ol className="cr-steps">
                                {instructions.map((step, index) => (
                                    <li className="cr-step-row" key={step.id}>
                                        <span className="cr-step-num" aria-hidden="true">{index + 1}</span>
                                        <label htmlFor={"cr-s" + step.id} className="cr-visually-hidden">Step {index + 1}</label>
                                        <textarea id={"cr-s" + step.id} rows="2" className="cr-input cr-step-text"
                                            placeholder={index === 0 ? "e.g. Preheat the oven to 180°C" : "Describe this step"}
                                            value={step.text} onChange={(e) => updateStep(step.id, e.target.value)} />
                                        <div className="cr-step-controls">
                                            <button type="button" className="cr-icon-btn" aria-label={"Move step " + (index + 1) + " up"}
                                                disabled={index === 0} onClick={() => moveStep(index, -1)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
                                            </button>
                                            <button type="button" className="cr-icon-btn" aria-label={"Move step " + (index + 1) + " down"}
                                                disabled={index === instructions.length - 1} onClick={() => moveStep(index, 1)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                                            </button>
                                            <button type="button" className="cr-icon-btn" aria-label={"Remove step " + (index + 1)}
                                                onClick={() => removeStep(step.id)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <button type="button" className="cr-btn cr-btn-outline cr-add"
                                onClick={() => setInstructions((prev) => [...prev, emptyStep()])}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                                Add step
                            </button>
                        </section>
                    </div>

                    <aside className="cr-side">
                        <fieldset className="cr-card">
                            <legend className="cr-card-title">Dietary info</legend>
                            {DIETS.map((d) => (
                                <label key={d.value} htmlFor={"cr-diet-" + d.value} className="cr-check">
                                    <input id={"cr-diet-" + d.value} type="checkbox"
                                        checked={diets.includes(d.value)} onChange={() => toggleDiet(d.value)} />
                                    <span>
                                        <span className="cr-check-label">{d.label}</span>
                                        <span className="cr-hint">{d.hint}</span>
                                    </span>
                                </label>
                            ))}
                        </fieldset>

                        <section className="cr-card">
                            <h2 className="cr-card-title">Details</h2>
                            <label htmlFor="cr-cuisine" className="cr-field-label">Cuisine</label>
                            <select id="cr-cuisine" className="cr-input" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                {[{ value: '', label: 'No cuisine' }, ...CUISINES].map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                            <label htmlFor="cr-servings" className="cr-field-label">Servings</label>
                            <input id="cr-servings" type="number" min="1" className="cr-input"
                                value={servings} onChange={(e) => setServings(e.target.value)} />
                            <DurationInput id="cr-prep" label="Preparation time" value={prep_time} onChange={setPrep} />
                            <DurationInput id="cr-cook" label="Cooking time" value={cook_time} onChange={setCook} />
                        </section>

                        <button type="submit" className="cr-btn cr-btn-primary cr-publish" disabled={submitting}>
                            {submitting
                                ? (editing ? 'Saving…' : 'Publishing…')
                                : (editing ? 'Save changes' : 'Publish recipe')}
                        </button>
                        {editing && (
                            <Link to="/myrecipes" className="cr-btn cr-btn-outline">Cancel</Link>
                        )}
                    </aside>
                </div>
            </form>
        </AnimatePage>
    );
}

function CreateRecipe() {
    return <RecipeForm />;
}

export default CreateRecipe;
