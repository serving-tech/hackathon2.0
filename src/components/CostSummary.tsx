import React from 'react';
import { DollarSign, TrendingUp, Users, Receipt } from 'lucide-react';

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

interface CostSummaryProps {
  people: Person[];
  items: ShoppingItem[];
}

const CostSummary: React.FC<CostSummaryProps> = ({ people, items }) => {
  const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
  const completedCost = items
    .filter(item => item.completed)
    .reduce((sum, item) => sum + item.cost, 0);
  const pendingCost = totalCost - completedCost;
  const costPerPerson = people.length > 0 ? totalCost / people.length : 0;

  const getPersonCosts = () => {
    return people.map(person => {
      const personItems = items.filter(item => item.addedBy === person.name);
      const personTotal = personItems.reduce((sum, item) => sum + item.cost, 0);
      const personCompleted = personItems
        .filter(item => item.completed)
        .reduce((sum, item) => sum + item.cost, 0);
      
      return {
        ...person,
        totalAdded: personTotal,
        completedAdded: personCompleted,
        owesAmount: costPerPerson,
      };
    });
  };

  const personCosts = getPersonCosts();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <Receipt className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Cost Summary</h3>
          <p className="text-sm text-gray-500">Breakdown of shopping expenses</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Cost</p>
              <p className="text-2xl font-bold text-blue-900">
                KES {totalCost.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Completed</p>
              <p className="text-2xl font-bold text-emerald-900">
                KES {completedCost.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-900">
                KES {pendingCost.toFixed(2)}
              </p>
            </div>
            <Receipt className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Per Person</p>
              <p className="text-2xl font-bold text-purple-900">
                KES {costPerPerson.toFixed(2)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Individual Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Individual Breakdown</h4>
        {personCosts.map((person) => (
          <div key={person.id} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {person.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{person.name}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                KES {person.owesAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Items Added</p>
                <p className="font-medium">KES {person.totalAdded.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">Items Completed</p>
                <p className="font-medium text-emerald-600">
                  KES {person.completedAdded.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostSummary;