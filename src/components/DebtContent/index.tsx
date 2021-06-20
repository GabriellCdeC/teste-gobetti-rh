import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { NewDebtModal } from '../NewDebtModal'
import { DebtDetailsModal } from '../DebtDetailsModal'
import api from '../../services/api';
import apiUsers from '../../services/apiUsers'
import searchIcon from '../../assets/search.png'
import paperIcon from '../../assets/copy.png'
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
    const [index, setIndex] = useState(-1)
    const [debts, setDebts] = useState<debtData[]>([])
    const [isNewDebtModalOpen, setIsNewDebtModalOpen]= useState(false)
    const [isDebtDetailsModalOpen, setIsDebtDetailsModalOpen]= useState(false)

    function handleOpenNewTransactionModal() {
        setIsNewDebtModalOpen(true)
    }

    function handleClosenNewTransactionModal() {
        setIsNewDebtModalOpen(false)        
    }

    function handleOpenDebtDetailsModal(i: number) {
        setIsDebtDetailsModalOpen(true)
        setIndex(i)
    }

    function handleClosenDebtDetailsModal() {
        setIsDebtDetailsModalOpen(false)        
    }

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
                const {data} = await api.get('?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7')
                setDebts(data.result)
            }            
            getDebtData()
        },[]) 

    } catch {
        toast.error('Erro ao buscar dados das dívidas')
    }

    const userDebts = debts.filter(deb => deb.idUsuario === hash)

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
                { 
                    hash === 0 ? 
                    <> 
                        <img key={hash} src={searchIcon} alt="Search Icon" />
                        <h2>Nenhum usuário selecionado, <br/> 
                        escolha um usuário no painel ao lado para obter suas dívidas.</h2> 
                    </>
                    :    
                    userDebts.length > 0 ?    
                    <>
                        <DebtDetailsModal isOpen={isDebtDetailsModalOpen} 
                            onRequestClose={handleClosenDebtDetailsModal} 
                            debts={userDebts}
                            setDebt={setDebts}
                            index={index}
                        />  
                        <div className="titleDivida" >
                            <h1>Lista de dívidas</h1>
                        </div>
                        
                        {
                            userDebts.map((debt, index) => {    
                                           
                                return (
                                    <>
                                    <button key={hash} type="button" onClick={() => handleOpenDebtDetailsModal(index)} className="debtList">
                                        <h2> {debt.motivo} </h2>                                              
                                    </button>


                                        <div  className="newDebtDiv">
                                            <button type="button" className="newDebt" onClick={handleOpenNewTransactionModal}>Cadastrar nova dívida</button>
                                        </div>
                                        <NewDebtModal isOpen={isNewDebtModalOpen} onRequestClose={handleClosenNewTransactionModal} idUsuario={hash} setDebt={setDebts} />

                                    </>                            
                                    )
                            })
                        }
                    </>
                    :
                        <> 
                            <img key={hash} src={paperIcon} alt="paper icon"/>
                            <h2>Esse usuário não possui dívidas registradas.</h2> 
                            <div  className="newDebtDiv">
                                <button type="button" className="newDebt" onClick={handleOpenNewTransactionModal}>Cadastrar nova dívida</button>
                            </div>
                                
                            <NewDebtModal isOpen={isNewDebtModalOpen} onRequestClose={handleClosenNewTransactionModal} idUsuario={hash} setDebt={setDebts} />
                        </>
                }
               
                
            </div>
        
        </div>
    )
}