import PropTypes from "prop-types"

export function ButtonTest({text, name = 'usuario'}){
    
    if(!text){
        console.error('el texto es requerido')
    }
    return <button>
        {text}
    </button>
}

ButtonTest.propTypes = {
    text: PropTypes.string.isRequired
}

ButtonTest.defaultProps = {
    name: 'some user'
}