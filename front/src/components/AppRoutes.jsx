import { Route, Routes } from "react-router-dom"
import Factory from "../pages/app/entreprise"
import School from "../pages/app/etablissement"
import Student from "../pages/app/etudiant"

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