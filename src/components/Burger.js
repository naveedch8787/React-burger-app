/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
const bacon = 'mt-2 w-full bg-orange-800 h-4'
const meat = 'mt-2 w-[100%] bg-gradient-to-r from-amber-800 to-amber-900 h-12 rounded-md'
const lettuce = 'mt-2 w-[100%] bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-2xl'
const cheese = 'mt-2 w-[100%] bg-gradient-to-r from-yellow-300 to-yellow-500 h-5 rounded-2xl'

const Ingredient = ({ type }) => {
  return (
    <div className={type} />
  )
}

const Recipie = ({ count, children }) => (
  new Array(count).fill(0).map(() => {
    return children
  })
)

const Burger = (props) => (
  <div className=' h-fit min-h-[60vh]'>
    <div className='flex justify-center content-center h-fit py-[50px]'>
      <div className='h-full w-[512px]'>
        {props.formToogle
        && (
        <div className='flex flex-col justify-center text-center mt-2 text-3xl'>
          <h1><strong>We hope it tastes well!</strong></h1>
        </div>
        )}
        <div className='upper-bun'></div>
        {props.lettuce == 0 && props.bacon == 0 && props.cheese == 0 && props.meat == 0
        && (
          <div className='mid flex flex-col justify-center text-center mt-2 text-lg'>
            <h2><strong>No ingredients Added</strong></h2>
          </div>
        )}
        <Recipie count={props.lettuce}>
          <Ingredient type={lettuce} />
        </Recipie>
        <Recipie count={props.bacon}>
          <Ingredient type={bacon} />
        </Recipie>
        <Recipie count={props.cheese}>
          <Ingredient type={cheese} />
        </Recipie>
        <Recipie count={props.meat}>
          <Ingredient type={meat} />
        </Recipie>
        <div className='lower-bun'>
        </div>
      </div>
    </div>
  </div>
)

export default Burger
