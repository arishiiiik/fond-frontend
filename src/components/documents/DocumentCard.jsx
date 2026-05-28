import '../../style.css'
import '../../document.css'

function DocumentCard({ title, file }) {
  const handleDownload = () => {
    // Создаём ссылку для скачивания
    const link = document.createElement('a')
    link.href = file
    link.download = title + '.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="document">
      <div className="document_zag">
        <img src="/images/doc.png" alt="Документ" />
        <h2>{title}</h2>
        <button onClick={handleDownload} className="download-button">
          Скачать PDF
        </button>
      </div>
    </div>
  )
}

export default DocumentCard