import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from './Table';

const CultureTable = () => {
  // 컬럼명과 컬럼명에 해당하는 값들 연결
  const columns = useMemo(
    () => [
      {
        Header: '전체리스트',
        columns: [
          {
            Header: '시설명',
            accessor: 'fac_name',
          },
          {
            Header: '문화시설',
            accessor: 'subjcode',
          },
          {
            Header: '시설위치',
            accessor: 'district',
          },
          {
            Header: '전화번호',
            accessor: 'phne',
          },
          {
            Header: '공식홈페이지',
            accessor: 'homepage',
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState([]); //
  const [pageCount, setPageCount] = useState(0);
  const [index, setIndex] = useState('');
  const [loadPageData, setLoadPageData] = useState([]);

  // 페이지번호가 바뀔때마다 문화시설 데이터를 10개씩 불러옴
  useEffect(() => {
    // TODO: CultureMap 부분의 백앤드 API 완성되면 API인스턴스로 수정하기
    axios
      .get(`http://localhost:4000/api/facility${index}`)
      .then(res => {
        setLoadPageData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [index]);

  // 10개씩 불러온 데이터를 200ms 지연시간을 두고 저장
  const fetchData = useCallback(({ pageSize }) => {
    setTimeout(() => {
      setData(loadPageData);
      setPageCount(Math.ceil(650 / pageSize));
      // }
    }, 200);
  });

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        setIndex={setIndex}
      />
    </Styles>
  );
};

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export default CultureTable;
