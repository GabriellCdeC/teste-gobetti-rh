import { toast } from 'react-toastify';
import { useState, FormEvent } from 'react'
import Modal from 'react-modal';
import api from '../../services/api';
import { FaCheck } from "react-icons/fa";
import closeImg from '../../assets/close.svg'
import './styles.scss'

interface DebtDetailsModalData{
    isOpen: boolean
    onRequestClose: () => void
    debts: any
    setDebt: any
    idUsuario: number
    index: number  
}

export function DebtDetailsModal ({isOpen, onRequestClose,setDebt, debts, index, idUsuario}: DebtDetailsModalData) {

    const [open, setIsOpen] = useState(false);
    const [motivo, setmotivo] = useState('')
    const [valor, setValor] = useState(0)

    const debtsArr = Array.from(debts) 

    const selectedDebt: any = debtsArr.filter((debts, indexDebt) => indexDebt === index)

    async function handleDeleteDebt(_id: number){
        try{
            await api.delete(`${_id}/?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7`)
            const {data} = await api.get('?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7')   
            setDebt(data.result)
            toast.success("Dívida excluída com suceso.")

        }catch{
            toast.error("Erro ao excluir a dívida")
        }

        onRequestClose()
        
    }

    function handleOpenEditDebtForm(){
        setIsOpen(true)
    }

    async function handleEditDebt(event: FormEvent){

        event.preventDefault()

        try{
            if(motivo === ''){
                toast.error("Por favor, informe o motivo.")
                return
            }
            await api.patch(`${selectedDebt[0]._id}/?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7`, {idUsuario, motivo, valor})
            const {data} = await api.get('?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7')   
            setDebt(data.result)
            toast.success("Dívida alterada com suceso.")

        } catch {
            toast.error("Erro ao editar a dívida.")
        }
        setIsOpen(false)
        onRequestClose()
              
    }


    if(selectedDebt.length > 0){
        return (
            <Modal 
                isOpen={isOpen}
                onRequestClose={onRequestClose} 
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
                ariaHideApp={false}
            >
                <button  
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close" 
                > 
                    <img src={closeImg} alt="Fechar Modal" /> 
                </button>
                
                <div className="debtDetails">
                    <h2>Detalhes da dívida</h2>

                    <p> <strong>Motivo: {selectedDebt[0].motivo}  | Valor: {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(selectedDebt[0].valor)} </strong></p>
                    <p>Criado em: {new Intl.DateTimeFormat('pt-BR').format(new Date(selectedDebt[0].criado))}</p>
                    <p><i>{selectedDebt[0]._id}</i></p>

                    <button type="button" className="buttonEdit" onClick={handleOpenEditDebtForm}>Editar dívida</button>
                    {
                        open === true ? 
                        <> 
                        <form onSubmit={handleEditDebt} className="formEditDebt" >
                            <input type="text" placeholder="Motivo" value={motivo} onChange={event => setmotivo(event.target.value)} />
                            <input type="number" placeholder="Valor" value={valor} onChange={event => setValor(Number(event.target.value))} />

                            <button type="submit"><FaCheck /></button>
                        </form>
                        </>
                        :
                        <></>
                    }
                    <button type="button" className="buttonDelete" onClick={() => handleDeleteDebt(selectedDebt[0]._id)}>Excluir dívida</button>
                </div>        
                
            </Modal>
        )
    }else{
        return (
            <></>
        )
    }
                                
}