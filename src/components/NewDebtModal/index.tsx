import { useState, FormEvent} from 'react'
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import api from '../../services/api';
import closeImg from '../../assets/close.svg'
import './styles.scss'

interface NewDebtModalData{
    isOpen: boolean
    onRequestClose: () => void
    idUsuario: number
    setDebt: any
}

export function NewDebtModal ({isOpen, onRequestClose, idUsuario, setDebt}: NewDebtModalData) {

    const [motivo, setmotivo] = useState('')
    const [valor, setValor] = useState(0)

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()
        try{
            await api.post('?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7', {idUsuario, motivo, valor});      
            const {data} = await api.get('?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7')   

            setDebt(data.result)
        
            setmotivo('')
            setValor(0)
        } catch {
            toast.error('Erro ao cadastrar dívida')
        }

        
        onRequestClose()
    }

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

            <form onSubmit={handleCreateNewTransaction}>
                <h2 className="h2NewDebt">Cadastrar dívida</h2>

                <input type="text" placeholder="Motivo" value={motivo} onChange={event => setmotivo(event.target.value)} />
                <input type="number" placeholder="Valor" value={valor} onChange={event => setValor(Number(event.target.value))} />

                <button type="submit">Cadastrar</button>
            </form>        
            
        </Modal>
    )
}