import { Aside } from "../../presentation/View";

export default function ViewAsideApps(props) {
  switch (props.ArrRutas[1]) {
    // case "inicio":
    //   return (
    //     <>
    //       <Aside nameMenu={"inicio"} />
    //     </>
    //   );
    // case "configuraciones":
    //   return (
    //     <>
    //       <Aside nameMenu={"configuraciones"} />
    //     </>
    //   );
    case "vehiculos-mayores":
      return (
        <>
          <Aside nameMenu={"vehiculos-mayores"} />
        </>
      );
    case "":
      return (
        <>
          <Aside nameMenu={"vehiculos-mayores"} />
        </>
      );
    default:
      return (
        <>
          <Aside nameMenu={""} />
        </>
      );
  }
}
