import { useState, FormEvent } from 'react'
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import './styles.scss'

interface NewDebtModalData{
    isOpen: boolean;
    onRequestClose: () => void;
    idUsuario: number
}

export function NewDebtModal ({isOpen, onRequestClose, idUsuario}: NewDebtModalData) {

    const [motivo, setmotivo] = useState('')
    const [valor, setValor] = useState(0)


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        console.log(motivo)
        console.log(valor)
        console.log(idUsuario)

        setmotivo('')
        setValor(0)
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
                className="react-modal-close" > 
                <img src={closeImg} alt="Fechar Modal" /> 
            </button>

            <form onSubmit={handleCreateNewTransaction} >
                <h2>Cadastrar dívida</h2>

                <input type="text" placeholder="Motivo" value={motivo} onChange={event => setmotivo(event.target.value)} />
                <input type="number" placeholder="Valor" value={valor} onChange={event => setValor(Number(event.target.value))} />

                <button type="submit">Cadastrar</button>
            </form>        
            
        </Modal>
    )
}