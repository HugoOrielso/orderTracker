import { CheckCircle, Package, Truck } from "lucide-react";
import React, { useState } from "react"
import { Toaster } from "sonner";

function App() {
  const [responseTrackings, setResponseTrackings] = useState<TrackingResponse | null>(null); 
  async function getTracking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valueFromForm = Object.fromEntries(new FormData(event.currentTarget)) as { guia: string };
    try {
      const request = await fetch("https://controlboxexpress.com/api/publicguia/" + valueFromForm.guia, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      });

      if (request.status === 200) { 
        const data: TrackingResponse = await request.json();
        setResponseTrackings(data);
      } 

    } catch (error) {
      console.error("Error en la conexión: ", error);
      setResponseTrackings(null);
    }
  }

  

  return (
    <div className="m-[0,auto] bg-zinc-100 flex items-center flex-col justify-center w-full min-h-screen">
      <div className="max-w-3xl bg-white gap-4 flex flex-col items-center justify-center rounded-lg w-full p-4">
        <form className="gap-3 flex flex-col max-w-96 w-full" onSubmit={getTracking}>
          <label htmlFor="guia" className="w-full">
            #Guía, tracking o WHR:
            <input
              type="text"
              id="guia"
              name="guia"
              className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block  p-2.5 w-full"
            />
          </label>
          <button
            type="submit"
            className="flex items-center bg-blue-500 text-center gap-1 px-4 py-2 cursor-pointer text-gray-100 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2"
          >
            Consultar
          </button>
        </form>
        <section>
        {responseTrackings?.Proveedor ? (
          <div>
            {responseTrackings.Proveedor &&
              <p className="text-lg font-semibold">Proveedor: {responseTrackings.Proveedor}</p>
            }

            {
              responseTrackings.GuiaProveedor && 
              <p className="text-gray-600"> Número de guía: {responseTrackings.GuiaProveedor} </p>

            }

            {
              responseTrackings.Estatus &&
              responseTrackings.Estatus.map((item,index)=>{
                return(
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8">
                      {index === 0 ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : index === responseTrackings.Estatus.length - 1 ? (
                        <Package className="w-8 h-8 text-blue-500" />
                      ) : (
                        <Truck className="w-8 h-8 text-yellow-500" />
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold">{item.nombre}</p>
                      <p className="text-sm text-gray-500">{item.fecha}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        ) : (
          <p></p>
        )}
      </section>
      </div>

      
      <Toaster richColors/>
    </div>
  );
}

export default App;
