import { useState, useEffect } from 'react'
import { getDocuments } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import '../style.css'
import '../document.css'

function DocumentsPage() {
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDocuments()
            .then(response => {
                setDocuments(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки документов:', error)
                setLoading(false)
            })
    }, [])

    const handleDownload = (fileUrl, title) => {
        const link = document.createElement('a')
        link.href = `http://127.0.0.1:8000${fileUrl}`
        link.download = title
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (loading) return (
        <div>
            <Header />
            <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка документов...</div>
            <Footer />
        </div>
    )

    return (
        <div>
            <Header />
            <HeroCarousel />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">Отчёты</p>
                    <div className="line"></div>
                    <p className="zag_description">Отчёты о проектах, реализуемых фондом</p>
                </div>

                <div className="document_list">
                    {documents.map(doc => (
                        <div key={doc.id} className="document">
                            <div className="document_zag">
                                <img src="/images/doc.png" alt="Документ" />
                                <h2>{doc.title}</h2>
                                <button 
                                    className="download-button" 
                                    onClick={() => handleDownload(doc.file_url, doc.title)}
                                >
                                    Скачать
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default DocumentsPage