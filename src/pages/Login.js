import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className='w-full h-full md:flex md:items-center overflow-auto'>
      <div className='relative flex items-center justify-center md:justify-end h-2/5 md:h-auto z-10 md:flex-1 md:mr-14'>
        <h1 className='text-gray-800 font-serif text-6xl md:text-8xl'>listen</h1>
      </div>
      <div className='relative z-10 px-12 md:px-0 md:flex-1 md:ml-14'>
        <LoginForm />
      </div>
      <div className='w-full h-full absolute top-0 z-0 bg-base bg-cover bg-top 2xl:bg-center opacity-70' />
    </div>
  )
}

export default Login;