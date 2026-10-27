import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API = 'http://localhost:5000/api/recipes'

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert']

const foodImages = {
  Breakfast: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=900',
  Lunch: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900',
  Dinner: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900',
  Snacks: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=900',
  Dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900',
  Drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=900',
}

const emptyForm = {
  title: '',
  category: 'Breakfast',
  ingredients: '',
  instructions: '',
  cookingTime: '',
  image: '',
}

function App() {
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const loadRecipes = async () => {
    try {
      setError('')
      const response = await axios.get(API)
      setRecipes(response.data)
    } catch {
      setError('Unable to load recipes. Please check your backend connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !form.title.trim() ||
      !form.ingredients.trim() ||
      !form.instructions.trim() ||
      !form.cookingTime ||
      Number(form.cookingTime) <= 0
    ) {
      alert('Please fill all required fields correctly.')
      return
    }

    try {
      setSaving(true)

      const data = {
        ...form,
        title: form.title.trim(),
        cookingTime: Number(form.cookingTime),
        image: form.image.trim() || foodImages[form.category] || foodImages.Lunch,
      }

      if (editingId) {
        await axios.put(`${API}/${editingId}`, data)
      } else {
        await axios.post(API, data)
      }

      resetForm()
      setSelected(null)
      await loadRecipes()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save recipe.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cookingTime: String(recipe.cookingTime),
      image: recipe.image || '',
    })

    setEditingId(recipe._id)
    setSelected(null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return

    try {
      await axios.delete(`${API}/${id}`)
      setSelected(null)
      await loadRecipes()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete recipe.')
    }
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || recipe.category.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const imageFor = (recipe) =>
    recipe.image || foodImages[recipe.category] || foodImages.Lunch

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">✳</span>
          <span>savora<span className="brand-dot">.</span></span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#discover">Discover recipes</a>
          <a href="#my-recipes">My collection</a>
        </div>

        <button
          className="nav-add"
          onClick={() => {
            resetForm()
            setShowForm(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span>＋</span> Add recipe
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR LITTLE CORNER OF FLAVOUR
            </div>

            <h1>
              Good food.
              <br />
              <span>Beautiful moments.</span>
            </h1>

            <p className="hero-description">
              Collect the recipes you love, discover new favourites,
              and make every meal a little more special.
            </p>

            <div className="hero-actions">
              <a href="#discover" className="hero-primary">
                Explore recipes <span>↗</span>
              </a>
              <button
                className="hero-secondary"
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
              >
                ＋ Share your recipe
              </button>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                <span>🍋</span>
                <span>🥑</span>
                <span>🍓</span>
              </div>
              <p><strong>{recipes.length} recipes</strong><br />in your personal cookbook</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-main">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
                alt="Freshly prepared colourful food"
              />
            </div>

            <div className="floating-note">
              <span className="note-icon">✦</span>
              <div>
                <strong>Made with love</strong>
                <p>One recipe at a time</p>
              </div>
            </div>

            <div className="floating-label">
              <span>🥬</span> Fresh ideas, always
            </div>
          </div>

          <div className="hero-decoration">S</div>
        </section>

        <section className="quick-stats">
          <div className="stat">
            <span className="stat-icon">📖</span>
            <div><strong>{recipes.length}</strong><span>Saved recipes</span></div>
          </div>
          <div className="stat">
            <span className="stat-icon">🍽️</span>
            <div><strong>{new Set(recipes.map(r => r.category)).size}</strong><span>Food categories</span></div>
          </div>
          <div className="stat">
            <span className="stat-icon">⏱</span>
            <div><strong>{recipes.length ? Math.round(recipes.reduce((sum, r) => sum + Number(r.cookingTime), 0) / recipes.length) : 0} min</strong><span>Average cook time</span></div>
          </div>
          <div className="stat">
            <span className="stat-icon">♡</span>
            <div><strong>Your way</strong><span>Your own cookbook</span></div>
          </div>
        </section>

        {showForm && (
          <section className="editor-section" id="recipe-editor">
            <div className="editor-card">
              <div className="editor-heading">
                <div>
                  <span className="section-kicker">{editingId ? 'MAKE IT YOUR OWN' : 'ADD SOMETHING DELICIOUS'}</span>
                  <h2>{editingId ? 'Edit your recipe' : 'What are we cooking?'}</h2>
                  <p>Every great meal starts with a little inspiration.</p>
                </div>
                <button className="editor-close" onClick={resetForm} aria-label="Close form">✕</button>
              </div>

              <form className="recipe-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="title">Recipe name *</label>
                  <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Creamy Tuscan Pasta" required />
                </div>

                <div className="field">
                  <label htmlFor="category">Category *</label>
                  <select id="category" name="category" value={form.category} onChange={handleChange}>
                    {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>

                <div className="field field-full">
                  <label htmlFor="ingredients">Ingredients *</label>
                  <textarea id="ingredients" name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="List your ingredients and quantities..." required />
                </div>

                <div className="field field-full">
                  <label htmlFor="instructions">Preparation steps *</label>
                  <textarea id="instructions" name="instructions" value={form.instructions} onChange={handleChange} placeholder="How do you bring this recipe to life?" required />
                </div>

                <div className="field">
                  <label htmlFor="cookingTime">Cooking time (minutes) *</label>
                  <input id="cookingTime" name="cookingTime" type="number" min="1" value={form.cookingTime} onChange={handleChange} placeholder="30" required />
                </div>

                <div className="field">
                  <label htmlFor="image">Food photo URL <span>(optional)</span></label>
                  <input id="image" name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="form-footer field-full">
                  <p><span>✦</span> Your recipe will be saved to your collection.</p>
                  <div>
                    <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
                    <button type="submit" className="submit-button" disabled={saving}>
                      {saving ? 'Saving...' : editingId ? 'Save changes ↗' : 'Save recipe ↗'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}

        <section className="discover-section" id="discover">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR NEXT FAVOURITE</span>
              <h2>Find your <em>inspiration.</em></h2>
              <p>All your delicious ideas, gathered in one place.</p>
            </div>

            <button
              className="add-inline"
              onClick={() => {
                resetForm()
                setShowForm(true)
                document.getElementById('recipe-editor')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              ＋ New recipe
            </button>
          </div>

          <div className="collection-toolbar" id="my-recipes">
            <div className="category-tabs">
              {categories.map(c => (
                <button
                  key={c}
                  className={`category-tab ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  {c === 'All' && <span>{recipes.length}</span>}
                </button>
              ))}
            </div>

            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search your recipes..."
                aria-label="Search recipes"
              />
              {search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}
            </div>
          </div>

          {error && <div className="error-banner">⚠ {error}</div>}

          {loading ? (
            <div className="loading-state">
              <span className="loading-spinner" />
              <p>Gathering your delicious ideas...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🥑</div>
              <h3>{search || category !== 'All' ? 'No recipes found just yet' : 'Your cookbook is a blank canvas.'}</h3>
              <p>{search || category !== 'All' ? 'Try another search or category.' : 'Save your first favourite recipe and start building something delicious.'}</p>
              {!search && category === 'All' && (
                <button className="submit-button" onClick={() => setShowForm(true)}>Create your first recipe ↗</button>
              )}
            </div>
          ) : (
            <div className="recipe-grid">
              {filteredRecipes.map((recipe, index) => (
                <article className="recipe-card" key={recipe._id}>
                  <button className="recipe-image" onClick={() => setSelected(recipe)} aria-label={`View ${recipe.title}`}>
                    <img
                      src={imageFor(recipe)}
                      alt={recipe.title}
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.src = foodImages.Lunch
                      }}
                    />
                    <span className="image-category">{recipe.category}</span>
                    <span className="image-number">{String(index + 1).padStart(2, '0')}</span>
                  </button>

                  <div className="recipe-card-body">
                    <div className="recipe-meta">
                      <span>◷ {recipe.cookingTime} min</span>
                      <span className="meta-dot">•</span>
                      <span>Homemade</span>
                    </div>

                    <h3>{recipe.title}</h3>
                    <p className="recipe-preview">
                      {recipe.ingredients.length > 95
                        ? recipe.ingredients.slice(0, 95) + '…'
                        : recipe.ingredients}
                    </p>

                    <div className="recipe-card-footer">
                      <button className="view-recipe" onClick={() => setSelected(recipe)}>
                        View recipe <span>↗</span>
                      </button>
                      <div className="card-actions">
                        <button onClick={() => handleEdit(recipe)} title="Edit recipe" aria-label="Edit recipe">✎</button>
                        <button onClick={() => handleDelete(recipe._id)} title="Delete recipe" aria-label="Delete recipe">⌫</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredRecipes.length > 0 && (
            <div className="collection-footer">
              <span>Showing <strong>{filteredRecipes.length}</strong> of <strong>{recipes.length}</strong> recipes</span>
              <span>Made for the love of food <span className="footer-heart">♥</span></span>
            </div>
          )}
        </section>
      </main>

      {selected && (
        <div className="detail-overlay" onClick={() => setSelected(null)}>
          <article className="detail-modal" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="Close details">✕</button>
            <div className="detail-image">
              <img src={imageFor(selected)} alt={selected.title} />
            </div>
            <div className="detail-content">
              <span className="section-kicker">{selected.category.toUpperCase()} · {selected.cookingTime} MINUTES</span>
              <h2>{selected.title}</h2>
              <div className="detail-rule" />
              <h3>What you'll need</h3>
              <p className="detail-copy">{selected.ingredients}</p>
              <h3>Let's make it</h3>
              <p className="detail-copy">{selected.instructions}</p>
              <div className="detail-actions">
                <button className="cancel-button" onClick={() => handleEdit(selected)}>✎ Edit recipe</button>
                <button className="submit-button" onClick={() => handleDelete(selected._id)}>Delete recipe</button>
              </div>
            </div>
          </article>
        </div>
      )}

      <footer className="site-footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-icon">✳</span>
          <span>savora<span className="brand-dot">.</span></span>
        </a>
        <p>A little more flavour in everyday life.</p>
        <span>MADE WITH ♥ AND A PINCH OF CREATIVITY</span>
      </footer>
    </div>
  )
}

export default App