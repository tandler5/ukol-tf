import React, { useLayoutEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { firestore } from '../../firebase';
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import '../css/content.css';
function Home() {
  const [astronauti, setAstronauti] = useState([]);
  useLayoutEffect(() => {
    onSnapshot(query(collection(firestore, 'astronauti')), (querysnapshot) => {
      setAstronauti(
        querysnapshot.docs.map((item) => ({
          id: item._document.data.value.mapValue.fields.id.stringValue,
          jmeno: item._document.data.value.mapValue.fields.jmeno.stringValue,
          prijmeni:
            item._document.data.value.mapValue.fields.prijmeni.stringValue,
          superschopnost:
            item._document.data.value.mapValue.fields.superschopnost
              .stringValue,
          datumnarozeni:
            item._document.data.value.mapValue.fields.datumnarozeni.stringValue,
        }))
      );
    });
  }, []);
  const handleInsertedRow = (row) => {
    setDoc(doc(firestore, 'astronauti', row.id), {
      id: row.id,
      jmeno: row.jmeno,
      prijmeni: row.prijmeni,
      superschopnost: row.superschopnost,
      datumnarozeni: row.datumnarozeni,
    });
  };
  const deleteRow = async (row) => {
    await Promise.all(
      row.map((id) => deleteDoc(doc(firestore, 'astronauti', String(id))))
    );
  };
  const options = {
    afterInsertRow: handleInsertedRow,
    onDeleteRow: deleteRow,
    insertText: 'Přidat astronauta',
    deleteText: 'Odebrat astronauta',
  };
  const afterSaveCella = (row) => {
    setDoc(doc(firestore, 'astronauti', String(row.id)), {
      id: row.id,
      jmeno: row.jmeno,
      prijmeni: row.prijmeni,
      superschopnost: row.superschopnost,
      datumnarozeni: row.datumnarozeni,
    });
  };
  return (
    <div className='content'>
      <p className='content__title'>Astronauti</p>
      <div className='content__table'>
        <BootstrapTable
          data={astronauti}
          striped
          hover
          deleteRow
          selectRow={{
            mode: 'checkbox',
          }}
          pagination
          search
          insertRow
          cellEdit={{
            mode: 'click',
            blurToSave: true,
            afterSaveCell: afterSaveCella,
          }}
          options={options}
        >
          <TableHeaderColumn
            dataField='id'
            isKey={true}
            dataAlign='center'
            dataSort={true}
            width='8%'
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='jmeno'
            dataSort
            width='22%'
            dataAlign='center'
          >
            Jméno
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='prijmeni'
            dataSort
            width='22%'
            dataAlign='center'
          >
            Přijmení
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='superschopnost'
            dataSort
            width='22%'
            dataAlign='center'
          >
            Superschopnost
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='datumnarozeni'
            dataSort
            width='22%'
            dataAlign='center'
          >
            Datum Narození
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    </div>
  );
}

export default Home;
