import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { getAdById, updateAd } from "@/services/ads.service";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./EditAd.module.css";

const CATEGORIES = [
  "Mobiles",
  "Electronics",
  "Vehicles",
  "Property",
  "Jobs",
  "Services",
  "Fashion",
  "Home & Garden",
  "Other",
];

function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingAd, setLoadingAd] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  /*
   * Load existing ad
   */
  useEffect(() => {
    let cancelled = false;

    const fetchAd = async () => {
      try {
        setLoadingAd(true);
        setServerError("");

        const response = await getAdById(id);

        if (cancelled) {
          return;
        }

        const ad = response.data.ad;

        reset({
          title: ad.title || "",
          description: ad.description || "",
          price: ad.price ?? "",
          category: ad.category || "Other",
          condition: ad.condition || "used",
          city: ad.location?.city || "",
          area: ad.location?.area || "",
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setServerError(error.message || "Unable to load this ad.");
      } finally {
        if (!cancelled) {
          setLoadingAd(false);
        }
      }
    };

    if (id) {
      fetchAd();
    }

    return () => {
      cancelled = true;
    };
  }, [id, reset]);

  /*
   * Update ad
   */
  const onSubmit = async (data) => {
    try {
      setServerError("");

      await updateAd({
        id,

        title: data.title,
        description: data.description,
        price: Number(data.price),

        category: data.category,
        condition: data.condition,

        location: {
          city: data.city,
          area: data.area,
        },
      });

      navigate("/my-ads", {
        replace: true,
      });
    } catch (error) {
      setServerError(
        error.message || "Unable to update your ad. Please try again.",
      );
    }
  };

  /*
   * Loading state
   */
  if (loadingAd) {
    return (
      <section className={styles.page}>
        <div className={styles.loadingState}>
          <Spinner />
          <p>Loading your ad...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit Ad</h1>

          <p className={styles.subtitle}>
            Update the information of your advertisement.
          </p>
        </div>

        {serverError && (
          <div className={styles.alert}>
            <Alert>{serverError}</Alert>
          </div>
        )}

        {!serverError && (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              id="title"
              label="Ad title"
              type="text"
              placeholder="e.g. iPhone X 64GB"
              autoComplete="off"
              disabled={isSubmitting}
              error={errors.title?.message}
              {...register("title", {
                required: "Ad title is required.",

                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters.",
                },

                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters.",
                },
              })}
            />

            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>

              <textarea
                id="description"
                className={`${styles.textarea} ${
                  errors.description ? styles.inputError : ""
                }`}
                placeholder="Describe your item..."
                rows={6}
                disabled={isSubmitting}
                {...register("description", {
                  required: "Description is required.",

                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters.",
                  },

                  maxLength: {
                    value: 5000,
                    message: "Description cannot exceed 5000 characters.",
                  },
                })}
              />

              {errors.description && (
                <p className={styles.errorMessage}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <Input
              id="price"
              label="Price"
              type="number"
              placeholder="e.g. 45000"
              min="0"
              step="1"
              disabled={isSubmitting}
              error={errors.price?.message}
              {...register("price", {
                required: "Price is required.",

                min: {
                  value: 0,
                  message: "Price cannot be negative.",
                },
              })}
            />

            <div className={styles.field}>
              <label htmlFor="category" className={styles.label}>
                Category
              </label>

              <select
                id="category"
                className={styles.select}
                disabled={isSubmitting}
                {...register("category", {
                  required: "Category is required.",
                })}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className={styles.errorMessage}>{errors.category.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="condition" className={styles.label}>
                Condition
              </label>

              <select
                id="condition"
                className={styles.select}
                disabled={isSubmitting}
                {...register("condition", {
                  required: "Condition is required.",
                })}
              >
                <option value="used">Used</option>
                <option value="new">New</option>
              </select>

              {errors.condition && (
                <p className={styles.errorMessage}>
                  {errors.condition.message}
                </p>
              )}
            </div>

            <div className={styles.locationSection}>
              <h2 className={styles.sectionTitle}>Location</h2>

              <div className={styles.locationGrid}>
                <Input
                  id="city"
                  label="City"
                  type="text"
                  placeholder="e.g. Sargodha"
                  autoComplete="address-level2"
                  disabled={isSubmitting}
                  error={errors.city?.message}
                  {...register("city", {
                    required: "City is required.",
                  })}
                />

                <Input
                  id="area"
                  label="Area"
                  type="text"
                  placeholder="e.g. Satellite Town"
                  autoComplete="address-line2"
                  disabled={isSubmitting}
                  error={errors.area?.message}
                  {...register("area")}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                disabled={isSubmitting}
                onClick={() => navigate("/my-ads")}
              >
                Cancel
              </Button>

              <Button type="submit" size="lg" loading={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default EditAd;
