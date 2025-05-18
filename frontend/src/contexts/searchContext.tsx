import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { User } from "../types/AuthInfo";
import * as searchService from "../services/searchService";

interface InputFilters {
  keywordSearch?: string;
  languages?: Array<string | undefined>;
  gender?: string;
  age?: string;
  categories?: Array<string | undefined>;
  skills?: Array<string | undefined>;
}

interface SearchContextType {
  filters: InputFilters | null;
  updateFilter: (name: string, value: any) => void;
  clearAllFilter: () => void;
  users: Array<User>;
  loading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const initFilters = {
  keywordSearch: "",
  age: "",
  gender: "",
  categories: [],
  skills: [],
  languages: [],
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<InputFilters | null>(initFilters);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users whenever filters change
  useEffect(() => {
    console.log("useEffect filterChanges");
    const fetchUsers = async () => {
      setLoading(true);
      try {
        console.log('FEFE', filters)
        const response = await searchService.searchUsers(filters);
        setUsers(response?.searchUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filters]);

  const updateFilter = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearAllFilter = () => {
    setFilters(initFilters);
  };

  return (
    <SearchContext.Provider
      value={{ users, loading, filters, updateFilter, clearAllFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("Must use inside AuthProvider");
  return context;
};
