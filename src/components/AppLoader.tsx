const AppLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-background z-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-[3px] border-zinc-400 border-b-gray-900 rounded-full opacity-80"></div>
    </div>
  )
}

export default AppLoader