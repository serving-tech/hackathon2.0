import React, { useState } from 'react';
import { Plus, Trash2, Users, UserPlus } from 'lucide-react';

interface Person {
  id: string;
  name: string;
}

interface PeopleManagerProps {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: string) => void;
}

const PeopleManager: React.FC<PeopleManagerProps> = ({
  people,
  onAddPerson,
  onRemovePerson,
}) => {
  const [newPersonName, setNewPersonName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Household Members</h3>
            <p className="text-sm text-gray-500">
              {people.length} {people.length === 1 ? 'person' : 'people'} sharing costs
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Manage</span>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Add Person Form */}
          <form onSubmit={handleAddPerson} className="flex space-x-3">
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              placeholder="Enter person's name..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </form>

          {/* People List */}
          <div className="space-y-2">
            {people.map((person, index) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900">{person.name}</span>
                  {index === 0 && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Owner
                    </span>
                  )}
                </div>
                
                {people.length > 1 && (
                  <button
                    onClick={() => onRemovePerson(person.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleManager;