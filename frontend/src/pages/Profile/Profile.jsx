import { useState } from "react";
import { FiEdit3, FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Alert from "@/components/ui/Alert/Alert";

import styles from "./Profile.module.css";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.location?.city || "",
    area: user?.location?.area || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.location?.city || "",
      area: user?.location?.area || "",
    });

    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.location?.city || "",
      area: user?.location?.area || "",
    });

    setError("");
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone || null,
        location: {
          city: formData.city || null,
          area: formData.area || null,
        },
      });

      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      setError(error.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Profile</h1>

            <p className={styles.subtitle}>
              Manage your personal information and account details.
            </p>
          </div>

          {!isEditing && (
            <Button
              type="button"
              onClick={handleEdit}
              className={styles.editButton}
            >
              <FiEdit3 />
              Edit profile
            </Button>
          )}
        </div>

        {success && (
          <div className={styles.alert}>
            <Alert variant="success">{success}</Alert>
          </div>
        )}

        {error && (
          <div className={styles.alert}>
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        <section className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{avatarLetter}</div>

            <div className={styles.profileIdentity}>
              <h2>{user?.name}</h2>

              <p>{user?.email}</p>

              <span
                className={
                  user?.emailVerified ? styles.verified : styles.unverified
                }
              >
                {user?.emailVerified ? "Email verified" : "Email not verified"}
              </span>
            </div>
          </div>

          <div className={styles.divider} />

          {isEditing ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <Input
                  label="Full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

                <Input
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />

                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />

                <Input
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter your area"
                />
              </div>

              <div className={styles.formActions}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button type="submit" loading={saving} disabled={saving}>
                  Save changes
                </Button>
              </div>
            </form>
          ) : (
            <div className={styles.details}>
              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <FiUser />
                </div>

                <div>
                  <span className={styles.detailLabel}>Full name</span>

                  <strong>{user?.name || "Not provided"}</strong>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <FiMail />
                </div>

                <div>
                  <span className={styles.detailLabel}>Email address</span>

                  <strong>{user?.email}</strong>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <FiPhone />
                </div>

                <div>
                  <span className={styles.detailLabel}>Phone number</span>

                  <strong>{user?.phone || "Not provided"}</strong>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <FiMapPin />
                </div>

                <div>
                  <span className={styles.detailLabel}>Location</span>

                  <strong>
                    {[user?.location?.area, user?.location?.city]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
