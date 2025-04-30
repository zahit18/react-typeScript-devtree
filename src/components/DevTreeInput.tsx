import { Switch } from '@headlessui/react'
import { DevTreeLink } from '../types'

type DevTreeInputProps = {
  item: DevTreeLink,
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEnabledLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnabledLink }: DevTreeInputProps) {
  return (
    <div className='bg-white shadow-lg p-5 flex items-center gap-3 rounded-lg'>
      <div
        className='w-12 h-12 bg-cover rounded-md'
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>
      
      <input
        type="text"
        className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
        placeholder={`https://${item.name}/user`}
        value={item.url}
        onChange={handleUrlChange}
        name={item.name}
      />

      <Switch
        checked={item.enabled}
        onChange={() => handleEnabledLink(item.name)}
        className={`${
          item.enabled ? 'bg-blue-600' : 'bg-gray-300'
        } relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span className="sr-only">Enable {item.name}</span>
        <span
          className={`${
            item.enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200`}
        />
      </Switch>
    </div>
  )
}