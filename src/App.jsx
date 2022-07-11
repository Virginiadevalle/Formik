import Header from "./componentes/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import short from "short-uuid";

function App() {
  const [usuariosInfo, setUsuariosInfo] = useState([]);

  const formularioV = useFormik({
    initialValues: {
      nombre: "",
      correo: "",
      direccion: "",
      presupuesto: "",
    },
    onSubmit: (values) => {
      const nuevoUsuario = {
        ...values,
        id: short.generate(),
      };
      setUsuariosInfo([...usuariosInfo, nuevoUsuario]);
    },

    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es requerido"),
      correo: Yup.string().required("El email es requerido"),
      direccion: Yup.string().required("La direccion es requerida"),
      presupuesto: Yup.number()
        .required("El presupuesto es requerido")
        .min(100),
    }),
  });

  // const formulario = useFormik({
  //   initialValues: {
  //     nombre: '',
  //     correo: ''
  //   },
  //   onSubmit: values => {
  //     console.log(values)
  //   },
  //   validationSchema: Yup.object({
  //     nombre: Yup.string().required("El nombre es requerido"),
  //     correo: Yup.string().required("El correo es requerido")
  //   })
  // });

  return (
    <>
      <Header />
      <div className="conatiner mx-4">
        <div className="row">
          <div className="col-6">
            <form onSubmit={formularioV.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Emilio"
                  name="nombre"
                  value={formularioV.values.nombre}
                  onChange={formularioV.handleChange}
                />
              </div>
              <div className="mb-4">
                <span className="text-danger">
                  {formularioV.errors.nombre && formularioV.touched.nombre && (
                    <>{formularioV.errors.nombre}</>
                  )}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="correo"
                  value={formularioV.values.correo}
                  onChange={formularioV.handleChange}
                />
              </div>
              <div className="mb-4">
                <span className="text-danger">
                  {formularioV.errors.correo && formularioV.touched.correo && (
                    <> {formularioV.errors.correo}</>
                  )}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Direccion"
                  name="direccion"
                  value={formularioV.values.direccion}
                  onChange={formularioV.handleChange}
                />
              </div>
              <div className="mb-4">
                <span className="text-danger">
                  {formularioV.errors.direccion &&
                    formularioV.touched.direccion && (
                      <>{formularioV.errors.direccion}</>
                    )}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">Presupuesto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Presupuesto"
                  name="presupuesto"
                  value={formularioV.values.presupuesto}
                  onChange={formularioV.handleChange}
                />
              </div>
              <div className="mb-4">
                <span className="text-danger">
                  {formularioV.errors.presupuesto &&
                    formularioV.touched.presupuesto && (
                      <>{formularioV.errors.presupuesto}</>
                    )}
                </span>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Salvar
              </button>
            </form>
          </div>
          <div className="col-6">
            {usuariosInfo.map((usuario ) => (
              <div key={usuario.id} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{usuario.nombre}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                  {usuario.correo}
                  </h6>
                  <p className="card-text mb-0">{usuario.direccion}
                  </p>
                  <div className="d-flex">
                    <span href="#" className="card-link">
                      Presupuesto:
                    </span>
                    <span href="#" className="card-link">
                    {usuario.presupuesto}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
