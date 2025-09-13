// GroupCreateModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
}

export default function GroupCreateModal({
  users,
  isOpen,
  onClose,
  onCreate,
}: {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, selectedUsers: string[]) => void;
}) {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create New Group
                </Dialog.Title>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                  />

                  <div className="h-64 overflow-y-auto">
                    {users.map(user => (
                      <label 
                        key={user._id}
                        className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                          className="mr-2"
                        />
                        {user.firstname} {user.lastname}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                      onCreate(groupName, selectedUsers);
                      onClose();
                    }}
                  >
                    Create Group
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}