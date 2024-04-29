import CommonEditAndUpdate from "../Common/CommonEditAndUpdate"

type NavbarProps = {
    modalHandler: (val: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ modalHandler }) => {
    return (
        <div style={{
            backgroundColor: '#393E46',
            color: '#eee',
            fontWeight: 'bold',
            // width: '100%'
        }}>
            <div
                style={{
                    maxWidth: '950px',
                    margin: 'auto',
                }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: "16px"
                }}>
                    <div style={{
                        fontSize: "1.3em"
                    }}>
                        Shaquelain's Book Library
                    </div>
                    <div>
                        <CommonEditAndUpdate
                            buttonTitle="Add New Book"
                            onAddNewForm={() => modalHandler(true)}
                            subTitle={""} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar