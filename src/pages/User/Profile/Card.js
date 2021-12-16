const Card = ({ title, data }) => {
  return (
    <div className='text-center xl:text-left'>
      <h4 className='text-gray-600 font-light sm:text-sm'>{title}</h4>
      {Array.isArray(data)
        ? <ul className='mt-1'>
            {data.map(i => <li key={i}>{i}</li>)}
          </ul>
        : <p className='mt-1'>{data}</p>
      }
    </div>
  )
}

export default Card;