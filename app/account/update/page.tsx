
const page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-3/4 flex flex-col h-3/5 justify-between">
            <h1 className='text-center text-4xl font-bold'>Login</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2'>Enter new password</label>
                  <input id='password' type="password" className='border border-slate-500 rounded-md px-4 py-2'/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='confirmPassword' className='mb-2'>Confirm password</label>
                  <input type='password' id='confirmPassword' className='border border-slate-500 rounded-md px-4 py-2'/>
                </div>
            </form>
            <button className='bg-slate-700 text-white rounded-md px-6 py-2 w-1/3'>Update Password</button>
        </div>
    </div>
  )
}

export default page