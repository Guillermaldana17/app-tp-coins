import AntdForms from './forms/AntdForms'
import ReactHookForm from './forms/ReactHookForm'
import VanillaForm from './forms/VanillaForm'

function Forms() {

    return (
        <>
            <VanillaForm />
            <hr />
            <hr />
            <ReactHookForm />
            <hr />
            <hr />
            <AntdForms />
        </>
    )
}

export default Forms
