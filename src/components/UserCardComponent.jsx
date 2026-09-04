export default function UserCardComponent({ user }) {
  const { name, email, company, website } = user;

  return (
    <div className="user-card">
      <div className="avatar">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <h3>{name}</h3>
        <p className="email">📧 {email}</p>
        {company && <p className="company">🏢 {company.name || company}</p>}
        {website && <p className="website">🌐 {website}</p>}
      </div>
    </div>
  );
}