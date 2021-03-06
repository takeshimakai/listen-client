const Card = ({ title, data }) => {
  return (
    <div className='text-center xl:text-left '>
      <h4 className='subtitle'>{title}</h4>
      {Array.isArray(data)
        ? data.length > 0
            ? <ul className='mt-1.5 sm:text-sm space-y-0.5'>
                {data.map(i => <li key={i}>{i}</li>)}
              </ul>
            : <p className='mt-1.5 sm:text-sm'>Undisclosed</p>
        : <p className='mt-1.5 sm:text-sm'>{data || 'Undisclosed'}</p>
      }
    </div>
  )
}

export default Card;