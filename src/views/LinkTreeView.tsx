import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { updateProfile } from "../api/DevTreeAPI"
import { SocialNetwork, User } from "../types"

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

useEffect(() => {
  if (user?.links) {
    try {
      const userLinks = JSON.parse(user.links);
      const updatedData = devTreeLinks.map(item => {
        const userLink = userLinks.find((link: SocialNetwork) => link.name === item.name);
        return userLink 
          ? { ...item, url: userLink.url, enabled: userLink.enabled }
          : item;
      });
      setDevTreeLinks(updatedData);
    } catch (error) {
      console.error("Error parsing user links:", error);
      // Opcional: mostrar mensaje de error al usuario
      toast.error("Error al cargar los enlaces guardados");
    }
  }
}, [user]); // Añade user como dependencia

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actializado correctamente')
    }
  })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
    setDevTreeLinks(updatedLinks)
  }

  const handleEnabledLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error('URL no valida')
        }
      }
      return link
    })
    setDevTreeLinks(updatedLinks)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
  }

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map(item => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnabledLink={handleEnabledLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
          onClick={() => mutate(user)}
        >Guardar Cambios</button>
      </div>
    </>
  )
}
