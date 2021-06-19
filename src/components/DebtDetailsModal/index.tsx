import { useState, FormEvent, useCallback } from 'react'
import Modal from 'react-modal';
import api from '../../services/api';
import closeImg from '../../assets/close.svg'
import '../NewDebtModal/styles.scss'

interface NewDebtModalData{
    isOpen: boolean
    onRequestClose: () => void
  
}

export function DebtDetailsModal ({isOpen, onRequestClose}: NewDebtModalData) {

    const [motivo, setmotivo] = useState('')
    const [valor, setValor] = useState(0)

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()
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
                <h2>Detalhes da dívida</h2>

                <p>TESTE</p>
                <p>TESTE</p>

                <button type="submit">Deletar</button>
            </form>        
            
        </Modal>
    )
}