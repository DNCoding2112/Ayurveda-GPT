//splash screen- loading component
const Loading=()=>{
    return(<>
        <div style={styles.container}>
        {/* container for the spinner and logo */}
        <div style={styles.spinnerContainer}>
        {/* centered logo */}
        <img src="/ayurveda-gpt-high-resolution-logo-transparent.png" alt="Ayurveda GPT Logo" style={styles.logo} />
        {/* rotating ring around the logo */}
        <div style={styles.spinnerRing}></div>
        </div>
        {/* loading text */}
        <p style={styles.text}>Loading...</p>
        </div>
    </>);
};

const styles={
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    spinnerContainer: {
        position: 'relative', // positioning for the logo and spinner ring
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '120px', // adjust size for the logo image
        height: '120px',
        zIndex: 1, // ensure the logo is above the spinner ring
    },
    //colorful gradient spinner around the logo image
    spinnerRing: {
        position: 'absolute', // absolute positioning for the spinner ring
        top: -20,
        left: -20,
        width: '125%',
        height: '125%',
        border: '4px solid transparent',
        borderTop: '4px solid #000000', // color for the top border
        borderRight: '4px solid #999999', // color for the right border
        borderBottom: '4px solid #000000', // color for the bottom border
        borderLeft: '4px solid #000000', // color for the left border
        borderRadius: '50%', // make it circular
        animation: 'spin 1.5s linear infinite', // apply spinning animation
    },
    text: {
        marginTop: '20px',
        fontSize: '20px',
        fontFamily: "'Lobster', sans-serif", // stylish font for loading text
        color: '#333',
    },
}

//spin animation for the spinner
const spinnerAnimation = document.createElement("style");
spinnerAnimation.innerHTML = `
@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
`;

document.head.appendChild(spinnerAnimation);

export default Loading;