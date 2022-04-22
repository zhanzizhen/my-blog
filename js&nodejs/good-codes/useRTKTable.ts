import { useState, useCallback, useEffect, useMemo } from "react";
import {
  FilterValue,
  GetRowKey,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/lib/table/interface";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { api } from "services/api";
import { camelToUnderline } from "utils/field-utils";
import { TableProps } from "antd";
import useRefProp from "./useRefProp";

type _ApiEndpointType = typeof api.endpoints;
/** api上endpoints的get方法 */
type _MethodNameOnlyGet = Extract<keyof _ApiEndpointType, `get${string}`>;

/** 根据methodName推断出reqparams的类型 */
type _ApiReq<E extends _MethodNameOnlyGet> =
  _ApiEndpointType[E]["useQuery"] extends (
    arg: infer T | typeof skipToken,
    options?: any
  ) => any
    ? T
    : never;

// TODO：这里其实可以根据methodName推断出response的类型，但碰到点类型问题，后面处理
// type _ApiRes<E extends _MethodNameOnlyGet> =
//   _ApiEndpointType[E]['useQuery'] extends (
//     arg: _ApiReq<E>,
//     options?: any
//   ) => infer T
//     ? T
//     : never;

interface ConfigType<R extends Object, M extends _MethodNameOnlyGet, Res> {
  /** for api.endpoints[methodName] */
  methodName: M;
  rowKey: Extract<keyof R, string> | GetRowKey<R>;
  /**
   * 约定好返回格式是{list: item[],totalSize:number}，
   * 如果后端数据不是如此，需要使用者转换一下。
   */
  formatResult: (data: Res) => {
    data: R[];
    total: number;
  };
  /** 除了offset，limit, sorter,其他要传的请求参数。requestParams必须被useMemo包裹，它的值的变化会引起重新请求 */
  requestParams?: _ApiReq<M>;
  /**可选，默认为10 */
  defaultPageSize?: number;
  /**如果值为"{}"（recommend），则把状态和状态变更全权交给useTable去处理 */
  rowSelection?: Partial<TableRowSelection<R>>;
  /**是否开启Table的loading，default true */
  hasLoading?: boolean;
  /**是否支持跨页多选 */
  preserveSelectedRowKeys?: boolean;
  /** 排序的配置 */
  sortConfig?: {
    /** 是否将字段转成小写带下划线的（后端不肯转，把粗话留给前端。。） */
    camelToUnderline?: boolean;
    /** 默认的排序，当前没有排序的时候，默认用这个排序（其实还是后端把粗活留给了前端。。） */
    defaultSorter?: SorterResult<R>;
  };
}

/**一个antd-table的hooks，目的是减少一些重复工作，加快开发速度 */
export default function useTable<
  /** 数据的类型 */
  R extends Object,
  /** api endpoints上的get方法名称 */
  M extends _MethodNameOnlyGet,
  /** 接口返回的类型，rtk生成的 */
  Res
>({
  methodName,
  defaultPageSize = 10,
  rowKey,
  rowSelection,
  hasLoading = true,
  formatResult,
  preserveSelectedRowKeys,
  requestParams,
  sortConfig,
}: ConfigType<R, M, Res>) {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sorter, setSorter] = useState<SorterResult<R>>(undefined);
  const [selectedRows, setSelectedRows] = useState<R[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>(
    []
  );

  const initialSorter = useRefProp(sortConfig?.defaultSorter);

  /** get接口的请求参数 */
  const requestParamsV2: any = useMemo(() => {
    let params = {
      offset: (current - 1) * pageSize,
      limit: pageSize,
    };

    const _sorter = sorter && sorter.order ? sorter : initialSorter.current;
    if (_sorter) {
      Object.assign(params, {
        field: sortConfig.camelToUnderline
          ? camelToUnderline(_sorter.field as string)
          : _sorter.field,
        order: _sorter.order,
      });
    }

    return Object.assign(params, requestParams ?? {});
  }, [
    current,
    initialSorter,
    pageSize,
    requestParams,
    sortConfig.camelToUnderline,
    sorter,
  ]);

  const [apiGet, { data: _data, isFetching }] =
    api.endpoints[methodName].useLazyQuery();

  useEffect(() => {
    apiGet(requestParamsV2);
    // this is important, requestParamsV2的变化会引起重新请求
  }, [apiGet, requestParamsV2]);

  let result: ReturnType<typeof formatResult>;
  try {
    result = formatResult(_data as any);
  } catch {
    result = {
      data: [],
      total: 0,
    };
  }

  /* 跳页、过滤、排序 */
  const onChange = useCallback(
    function (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue>,
      sorter: SorterResult<R> | SorterResult<R>[]
    ) {
      if (sorter) {
        setSorter(Array.isArray(sorter) ? sorter[0] : sorter);
      }
      if (typeof pagination !== "boolean") {
        setCurrent(pagination.current || 1);
        setPageSize(pagination.pageSize || pageSize);
      }
    },
    [pageSize, setSorter]
  );

  /**提供一个让外界主动刷新列表的api */
  const reloadTable =
    /**loadFromFirstPage: 是否跳到第一页，默认在当前页面刷新 */
    (loadFromFirstPage?: boolean) => {
      const _params = {
        ...requestParamsV2,
      };
      if (loadFromFirstPage) {
        setCurrent(1);
        _params.offset = 0;
      }
      apiGet(_params);
    };

  const rowSelectionV2: TableRowSelection<R> = useMemo(() => {
    return {
      selectedRowKeys,
      ...rowSelection,
      onChange: (rowKyes: string[] | number[], rows: R[]) => {
        if (rowSelection?.onChange) {
          rowSelection.onChange(rowKyes, rows);
        }
        setSelectedRowKeys(rowKyes);
        setSelectedRows(rows);
      },
      preserveSelectedRowKeys,
    };
  }, [preserveSelectedRowKeys, rowSelection, selectedRowKeys]);

  const tableProps: TableProps<R> = {
    loading: hasLoading ? (isFetching as boolean) : undefined,
    dataSource: result.data,
    onChange,
    rowKey,
    rowSelection: rowSelection ? rowSelectionV2 : undefined,
    pagination: {
      current,
      pageSize,
      total: result.total,
    },
  };

  return {
    /**antd-table的props，直接放在<Table />上 */
    tableProps,
    selectedRows,
    reloadTable,
    clearSelection: () => {
      rowSelectionV2.onChange([], []);
    },
    setCurrent,
    setPageSize,
  };
}
