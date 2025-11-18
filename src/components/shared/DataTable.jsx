'use client'; 

import { useState } from 'react';
import Link from 'next/link';
// 'useRouter' não é necessário aqui se só o usarmos para 'refresh'
// import { useRouter } from 'next/navigation'; 

export default function DataTable({ initialData, columns, editPath, onDelete }) {
  const [items, setItems] = useState(initialData || []);

  const handleDeleteClick = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) {
      return;
    }
    
    try {
      await onDelete(id);
      alert('Item excluído com sucesso!');
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <td key={col.key}>{col.label}</td>
          ))}
          <td style={{ textAlign: 'right' }}>Ações</td>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            {/* --- ESTA É A CORREÇÃO --- */}
            {/* O texto agora é estático, sem a variável que dava erro */}
            <td colSpan={columns.length + 1}>Nenhum item encontrado.</td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}
              
              <td style={{ textAlign: 'right' }}>
              <Link href={`${editPath}/${item.id}`} className="btn" style={{ background: '#287bff' }}>
                Editar
              </Link>
              <button 
                className="btn btn-excluir" 
                style={{ background: '#f44336' }}
                onClick={() => handleDeleteClick(item.id)}
              >
                Excluir
              </button>
            </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}