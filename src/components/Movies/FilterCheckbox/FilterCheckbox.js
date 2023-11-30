function FilterCheckbox() {
  return (
    <section className="filter" aria-label="Фильтр">
      <input type="checkbox" id="checkbox" className="filter__checkbox" />
      <label htmlFor="checkbox" className="filter__label">
        Короткометражки
      </label>
    </section>
  );
}

export default FilterCheckbox;
