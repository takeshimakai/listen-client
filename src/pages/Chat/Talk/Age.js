const Age = ({ input, handleInput }) => {
  return (
    <div>
      <div>
        <label htmlFor='minAge'>Min age</label>
        <input
          id='minAge'
          type='number'
          name='minAge'
          min={0}
          value={input.minAge}
          onChange={handleInput}
        />
      </div>
      <div>
        <label htmlFor='maxAge'>Max age</label>
        <input
          id='maxAge'
          type='number'
          name='maxAge'
          min={0}
          value={input.maxAge}
          onChange={handleInput}
        />
      </div>
    </div>
  )
}

export default Age;