import { Route, Routes } from "react-router-dom"
import Student from "../pages/etudiant"
import School from "../pages/etablissement"
import Factory from "../pages/entreprise"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='factory' element={<Factory />} />
            <Route path='student' element={<Student />} />
            <Route path='school' element={<School />} />
        </Routes>
    )
}

export default AppRoutes