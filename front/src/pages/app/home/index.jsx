import { ProSidebarProvider } from 'react-pro-sidebar'
import Applayout from '../../../components/Applayout'

const Home = () => {
    return (
        <ProSidebarProvider>
            <Applayout />
        </ProSidebarProvider>
    )
}

export default Home
