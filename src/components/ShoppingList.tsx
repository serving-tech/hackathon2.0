import React, { useState } from 'react';
import { Plus, Trash2, Users, DollarSign, Check, ShoppingCart } from 'lucide-react';

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

interface ShoppingListProps {
  listId: string;
  listName: string;
  people: Person[];
  items: ShoppingItem[];
  onAddItem: (item: Omit<ShoppingItem, 'id'>) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItemCost: (id: string, cost: number) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  listName,
  people,
  items,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onUpdateItemCost,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
  const costPerPerson = people.length > 0 ? totalCost / people.length : 0;
  const completedItems = items.filter(item => item.completed).length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem({
        name: newItemName.trim(),
        cost: parseFloat(newItemCost) || 0,
        completed: false,
        addedBy: people[0]?.name || 'User',
      });
      setNewItemName('');
      setNewItemCost('');
    }
  };

  const handleCostUpdate = (id: string, value: string) => {
    const cost = parseFloat(value) || 0;
    onUpdateItemCost(id, cost);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{listName}</h2>
            <p className="text-sm text-gray-500">
              {completedItems} of {items.length} items completed
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="text-2xl font-bold text-gray-900">KES {totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-emerald-100 p-2 rounded-xl">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* People and Cost Split */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">
              {people.length} {people.length === 1 ? 'person' : 'people'}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Cost per person</p>
            <p className="text-xl font-bold text-emerald-600">
              KES {costPerPerson.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {people.map((person) => (
            <span
              key={person.id}
              className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            >
              {person.name}
            </span>
          ))}
        </div>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add new item..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              value={newItemCost}
              onChange={(e) => setNewItemCost(e.target.value)}
              placeholder="Cost"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Shopping Items */}
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
                item.completed
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300'
              }`}
            >
              <button
                onClick={() => onToggleItem(item.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  item.completed
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-gray-300 hover:border-emerald-500'
                }`}
              >
                {item.completed && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className="flex-1">
                <p
                  className={`font-medium transition-all ${
                    item.completed
                      ? 'text-emerald-700 line-through'
                      : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">Added by {item.addedBy}</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">KES</span>
                  <input
                    type="number"
                    value={item.cost}
                    onChange={(e) => handleCostUpdate(item.id, e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No items in your shopping list yet.</p>
            <p className="text-sm">Add your first item above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;