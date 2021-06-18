import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import api from '../../services/api';
import apiUsers from '../../services/apiUsers'
import './styles.scss'

interface userData{
    id: number
    name: string
    email: string
}

interface debtData {
    _id: string
    motivo: string
    valor: number
    idUsuario: number
    criado: Date
}

export function DebtContent(){
    const [users, setUsers] = useState<userData[]>([])
    const [hash, setHash] = useState(0)
    const [debts, setDebts] = useState<debtData[]>([])

    try{       
        useEffect(() => {
    
            async function getUsersData() {
                const {data} = await apiUsers.get('')
                setUsers(data)            
            }            
            getUsersData()
        },[])   

    } catch{
        toast.error('Erro ao buscar lista de clientes')
    }

    function handleChangeUser(id: number){     
        setHash(id)  
    }

    try {
        useEffect(() => {
    
            async function getDebtData() {
                const {data} = await api.get('')
                setDebts(data.result)
                console.log(debts)
            }            
            getDebtData()
        },[]) 

    } catch {
        toast.error('Erro ao buscar dados das dívidas')
    }


   

    return (
        <div className="mainContent">
            <div className="userBar">

                <h3 >Lista de Usuários</h3>
                {
                    users.map(user => {
                        return (                            
                            hash === user.id ? <button key={user.id} className="buttonLink" onClick={() => handleChangeUser(user.id)} ><a  id="userData" className="active">{user.name}</a></button>  :
                            <button key={user.id} className="buttonLink" onClick={() => handleChangeUser(user.id)}><a>{user.name}</a></button>                   
                        )
                    })
                }
            </div>

            <div className="debtContent">
                <h1>Debt of client {hash}</h1>
                
            </div>
        
        </div>
    )
}