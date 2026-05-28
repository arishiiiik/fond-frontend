import '../style.css'

function PartnerCard( {partner} ){
    const className = parther.type == 'long' ? 'partner_long': 'partner'

    return(
        <div className={className}>
            {partner.logo && (
                <img className='partner_img' src={partner.logo} alt={partner.name} />
            )}
            <a className='partner_name' href={partner.url} target='_blank' rel='noopener noreferrer'>
                {partner.name}
            </a>
        </div>
    )
}

export default PartnerCard