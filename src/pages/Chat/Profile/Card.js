const Card = ({ title, data }) => {
  return (
    <div className='text-center'>
      <h4 className='subtitle'>{title}</h4>
      {Array.isArray(data)
        ? data.length > 0
            ? <ul className='mt-1.5 sm:text-sm space-y-0.5'>
                {data.map(i => <li key={i}>{i}</li>)}
              </ul>
            : <p className='mt-1.5 sm:text-sm'>undisclosed</p>
        : <p className='mt-1.5 sm:text-sm'>{data || 'undisclosed' }</p>
      }
    </div>
  )
}

export default Card;