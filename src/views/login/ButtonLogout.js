import { handleLogout } from '../../utils/actions/actions'

export default function ButtonLogout() {


  
  return (
    <button onClick={()=> handleLogout()}>
      Salir
    </button>
  )
}
