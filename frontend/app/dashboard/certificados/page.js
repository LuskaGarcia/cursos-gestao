import { getCertificates } from '@/lib/api';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function CertificadosPage() {
  const certificates = await getCertificates();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Documentos</span>
          <h1>Certificados</h1>
          <p>Certificados emitidos pela API.</p>
        </div>
      </div>

      {certificates.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Curso</th>
                <th>Emissão</th>
                <th>Validade</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id_certificado}>
                  <td>{certificate.codigo_autenticacao}</td>
                  <td>{certificate.matricula?.curso?.titulo ?? '—'}</td>
                  <td>{formatDate(certificate.data_emissao)}</td>
                  <td>{formatDate(certificate.data_validade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">Nenhum certificado emitido.</div>
      )}
    </>
  );
}
