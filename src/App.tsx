import React, { useState } from 'react';
import { ShoppingCart, Users, Receipt } from 'lucide-react';
import ShoppingList from './components/ShoppingList';
import PeopleManager from './components/PeopleManager';
import CostSummary from './components/CostSummary';

interface Person {
  id: string;
  name: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  cost: number;
  completed: boolean;
  addedBy: string;
}

function App() {
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ]);

  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: '1',
      name: 'Milk',
      cost: 120.0,
      completed: false,
      addedBy: 'John Doe',
    },
    {
      id: '2',
      name: 'Bread',
      cost: 80.0,
      completed: true,
      addedBy: 'Jane Smith',
    },
    {
      id: '3',
      name: 'Eggs',
      cost: 200.0,
      completed: false,
      addedBy: 'John Doe',
    },
  ]);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name,
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const addItem = (item: Omit<ShoppingItem, 'id'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString(),
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemCost = (id: string, cost: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cost } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-2xl">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Shared Shopping List
                </h1>
                <p className="text-gray-600">
                  Shop together, split costs automatically
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-gray-600">
                  {people.length} {people.length === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-600">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* People Management */}
        <PeopleManager
          people={people}
          onAddPerson={addPerson}
          onRemovePerson={removePerson}
        />

        {/* Shopping List */}
        <ShoppingList
          listId="main"
          listName="Weekly Grocery Shopping"
          people={people}
          items={items}
          onAddItem={addItem}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
          onUpdateItemCost={updateItemCost}
        />

        {/* Cost Summary */}
        <CostSummary people={people} items={items} />
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">SplitCart</h3>
              </div>
              <p className="text-gray-400">
                The easiest way to shop together and split costs fairly among household members.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Real-time list syncing</li>
                <li>• Automatic cost splitting</li>
                <li>• Household management</li>
                <li>• Cost tracking & analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Pricing</h4>
              <div className="text-gray-400">
                <p>KES 100/month per household</p>
                <p className="text-sm mt-2">
                  Includes unlimited lists, members, and premium features
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SplitCart. Making shared shopping simple.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;