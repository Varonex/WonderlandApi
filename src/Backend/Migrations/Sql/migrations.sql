-- Table des migrations.
create table wonderland_migrations (
	id bigserial primary key,
	timestamp timestamp not null,
	name varchar not null,
  migration_date timestamp
);
