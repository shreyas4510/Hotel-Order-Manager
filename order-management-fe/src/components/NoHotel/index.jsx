import Hotel from '../../assets/images/hotel.png';

function NoHotel() {
    return (
        <div className="mt-5 text-center">
            <h1>No Hotel Found</h1>
            <p style={{ fontSize: '20px', color: '#666' }}>Sorry, there is no hotel assigned to this manager.</p>
            <img src={Hotel} alt="No Hotel Found" style={{ width: '330px', height: '300px', marginTop: '20px' }} />
        </div>
    );
}

export default NoHotel;
