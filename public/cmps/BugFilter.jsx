const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'number') value = +value
    if (type === 'checkbox') value  = value * -1
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    console.log(filterByToEdit);
    onSetFilter(filterByToEdit)
  }

  const { txt, severity, label, sortBy, sortDir } = filterByToEdit
  return (
    <section className="bug-filter full main-layout">
      <h2>Filter Our Bugs</h2>

      <form onSubmit={onSubmitFilter}>
        <label htmlFor="txt">Text:</label>
        <input
          value={txt}
          onChange={handleChange}
          name="txt"
          id="txt"
          type="text"
          placeholder="By Text"
        />

        <label htmlFor="severity">Severity:</label>
        <input
          value={severity}
          onChange={handleChange}
          type="number"
          name="severity"
          id="severity"
          placeholder="By Severity"
        />

        <label htmlFor="label">Label:</label>
        <select id="label"
          value={label}
          onChange={handleChange}
          name="label"
        >
          <option value="">none</option>
          <option value="critical">critical</option>
          <option value="dev-branch">dev-branch</option>
          <option value="need-CR">need-CR</option>
        </select>

        <label htmlFor="sort">sort by:</label>
        <select id="sort"
          value={sortBy}
          onChange={handleChange}
          name="sortBy"
        >
          <option value="">none</option>
          <option value="title">title</option>
          <option value="severity">severity</option>
          <option value="createdAt">create time</option>
        </select>

        <label htmlFor="sortDir">descending:</label>
        <input
          value={sortDir}
          onChange={handleChange}
          type="checkbox"
          name="sortDir"
          id="sortDir"
          checked={sortDir > 0 ? false : true}
        />

        <button>Filter Bugs</button>
      </form>
    </section>
  )
}
