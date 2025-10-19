export interface FilterState {
  quickFilter: string | null;
  dateRange: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  transactionTypes: {
    digitalProducts: boolean;
    coffee: boolean;
    webinars: boolean;
    withdrawals: boolean;
    other: boolean;
  };
  transactionStatuses: {
    successful: boolean;
    pending: boolean;
    failed: boolean;
  };
}

export const defaultFilterState: FilterState = {
  quickFilter: null,
  dateRange: {
    startDate: undefined,
    endDate: undefined,
  },
  transactionTypes: {
    digitalProducts: false,
    coffee: false,
    webinars: false,
    withdrawals: false,
    other: false,
  },
  transactionStatuses: {
    successful: false,
    pending: false,
    failed: false,
  },
};
