import { ProSidebarProvider } from 'react-pro-sidebar'
import Applayout from '../../components/Applayout'

const App = () => {
    return (
        <ProSidebarProvider>
            <Applayout />
        </ProSidebarProvider>
    )
}

export default App