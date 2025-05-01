import { useForm } from 'react-hook-form'
import slugify from 'react-slugify';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from '../api/DevTreeAPI';
import { Link } from 'react-router-dom';

export default function SearchForm() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      handle: ''
    }
  })

  const mutation = useMutation({
    mutationFn: searchByHandle
  })

  const handle = watch('handle')

  const handleSearch = () => {
    const slug = slugify(handle)
    mutation.mutate(slug)
  }

  console.log(mutation)

  return (
     <form
  onSubmit={handleSubmit(handleSearch)}
  className="space-y-5">
  <div className="relative flex items-center  bg-white  px-2">
    <label
      htmlFor="handle"
    >devtree.com/</label>
    <input
      type="text"
      id="handle"
      className="border-none bg-transparent p-2 focus:ring-0 flex-1"
      placeholder="elonmusk, zuck, jeffbezos"
      {...register("handle", {
        required: "Un Nombre de Usuario es obligatorio",
      })}
    />

  </div>
  {errors.handle && (
    <ErrorMessage>{errors.handle.message}</ErrorMessage>
  )}

  <div className="mt-10">
    {mutation.isPending && <p className='text-center'>Cargando...</p> }
    {mutation.error && <p className='text-center text-red-600 font-black'>{mutation.error.message}</p> }
    {mutation.data && <p className='text-center text-cyan-500 font-black'>{mutation.data} ir a <Link to={'/auth/register'} state={{handle: slugify(handle)}}>Registro</Link> </p> }

  </div>

  <input
    type="submit"
    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
    value='Obtener mi DevTree'
  />
</form>
  )
}
